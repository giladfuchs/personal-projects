const {
  error422,
  error404,
  error403Admin
} = require("../../utils/error/dbErrorHandler");
const Service = require("../../models/service.model");
const Employee = require("../../models/employee.model");
const Cart = require("../../models/cart.model");
const { matrix, parseJsonMongo } = require('./queue.helper.controller')

exports.setServiceToQueue = async (req, res, next) => {
  try {

    const servicesListOfNewQueue = req.body;

    const isValid = Object.keys(servicesListOfNewQueue).reduce((acc, index) => acc + servicesListOfNewQueue[index], 0)
    error404(isValid)

    const services = await Service(req.mongo).find({ available: true });
    const employee = await Employee(req.mongo).findOne();

    const timeDistance = employee.otherData.timeDistance

    const ans = await matrix(next, parseJsonMongo(employee.schedule), req.mongo, services, timeDistance, servicesListOfNewQueue);
    const mat = ans.mat;
    const days = ans.days
    const startMinTime = ans.startMinTime;
    const durationOfNewQueue = ans.durationOfNewQueue;
    const price = ans.price;
    const serviceCart = Object.keys(servicesListOfNewQueue).map(s => {
      return {
        serviceId: s,
        count: servicesListOfNewQueue[s]
      }
    })

    const cart = new Cart({
      price,
      duration: durationOfNewQueue,
      services: serviceCart,
      clientId: req.client._id,
      domain: req.mongo.name
    })
    await cart.save();
    error404(ans);
    res.status(201).json({
      msg: "all the queues",
      mat,
      days,
      startMinTime,
      timeDistance,
      durationOfNewQueue,
      price
    });
  } catch (error) {
    return next(error);
  }
};


const io = require('./socket')

const Stripe = require('stripe');
exports.payment = async (req, res, next) => {

  const stripe = Stripe("sk_test_Vbw1vsnbkqthENhIC7XDf53q00qDVDrcbM");
  console.log("payment");

  try {
    const event =
      stripe.webhooks.constructEvent(
        req.rawBody, req.get('stripe-signature'),
        'whsec_UHyYr1CtlHbo5CH02rzjOOPVySSbGV8z'
      );
    if (event.type === 'payment_intent.succeeded') {
      const session = event.data.object.description.split(',');

      const cart = parseJsonMongo(await Cart.findOne({ clientId: session[0] }));
      console.log("cart ", cart.price, " strip ", event.data.object.amount_received, session);

      const mongo = require("mongoose").connection.useDb(cart.domain);
      const Queue = require("../../models/queue.model")(mongo);


      error404(cart);
      //need transaction
      await Cart.deleteOne({ _id: cart._id })
      delete cart['_id'];
      delete cart['domain']
      const queue = new Queue({
        ...cart, isPaid: true,
        hour: session[1],
        day: session[2],
      });
      await queue.save();


      io.getIO().emit('queue', { action: mongo.name, queue: queue })
      res.status(201).json({
        msg: "create new queue",
        queue,

      });

    }
    else {
      const session = req.get('session');
      const cart = parseJsonMongo(await Cart.findOne({ clientId: session }));
      const mongo = require("mongoose").connection.useDb(cart.domain);
      const Queue = require("../../models/queue.model")(mongo);


      error404(cart);
      //need transaction
      await Cart.deleteOne(cart._id)
      delete cart['_id'];

      const queue = new Queue({
        ...cart, isPaid: true,
        hour: session[1],
        day: session[2],
      });
      await queue.save();
      console.log(queue);

      res.status(200).send({ received: false });
    }
  } catch (error) {
    console.log(error);

    res.status(404).send({ error });
  }


};



exports.card = async (req, res, next) => {
  try {

    const cart = parseJsonMongo(await Cart.findOne({ clientId: req.client._id }));
    error404(cart);
    delete cart['_id'];

    const stripe = Stripe("sk_test_Vbw1vsnbkqthENhIC7XDf53q00qDVDrcbM");
    const urlStripe = "https://queues-vip.web.app/";
    console.log(req.body);

    const lineItem = {
      name: req.client.details.firstName,
      amount: cart.price * 100,
      currency: "ILS",
      quantity: 1,

    };
    const session = await stripe.checkout.sessions.create({
      client_reference_id: "clientReferenceId",
      customer_email: req.client.details.lastName + "@gmail.com",
      payment_method_types: ['card'],
      line_items: [lineItem],
      payment_intent_data: {
        description: [req.client._id.toString(), req.body.hour, req.body.day].join(',')
      },
      success_url: urlStripe,
      cancel_url: urlStripe,
    });

    res.status(201).json({
      msg: "create new queue",

      session
    });
  } catch (err) {
    // console.log(err);

    return next(err);
  }
};



exports.cash = async (req, res, next) => {
  try {

    const Queue = require("../../models/queue.model")(req.mongo);


    const cart = parseJsonMongo(await Cart.findOne({ clientId: req.client._id }));
    error404(cart);

    //need transaction
    await Cart.deleteOne({ _id: cart._id })
    delete cart['_id'];

    const queue = new Queue({
      ...cart, isPaid: false,
      day: req.body.day,
      hour: req.body.hour
    });
    await queue.save();

    io.getIO().emit('queue', { action: req.mongo.name, queue: queue })
    res.status(201).json({
      msg: "create new queue",
      queue,

    });
  } catch (err) {
    // console.log(err);

    return next(err);
  }
};
















exports.getQueues = async (req, res, next) => {
  try {
    error422(req);
    const Queue = require("../../models/queue.model")(req.mongo);



    const ff = await Queue.find()
      .populate("clientId").populate("serviceId").exec();

    // const f = await Service.findOne(ff.serviceId);
    const f = await queue.populate("clientId")
      .execPopulate()
    console.log(ff.serviceId, ff);


    error404(queue)
    res.status(205).send({
      message: "queue update",
      queue: queue,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteQueue = async (req, res, next) => {
  try {
    const queueId = req.get("_id");


    const Queue = require("../../models/queue.model")(req.mongo);

    await error403Admin(req);

    await Queue.findByIdAndDelete(queueId);
    res.status(200).json({ message: "queue deleted" });
  } catch (err) {
    return next(err);
  }
};
