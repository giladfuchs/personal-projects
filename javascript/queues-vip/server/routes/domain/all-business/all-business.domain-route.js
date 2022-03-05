const router = require("express").Router();
const moment = require('moment')

const isAuth = require("../../../middleware/is-auth")

const Business = require("../../../models/details.model");
const Service = require("../../../models/service.model");
const Employee = require("../../../models/employee.model");
const Queue = require("../../../models/queue.model");




router.get("/", isAuth("client"), async (req, res, next) => {
  try {
    const business = await Business(req.mongo).findOne();
    const services = await Service(req.mongo).find({ available: true });
    const employee = await Employee(req.mongo).findOne();
    const queues = await Queue(req.mongo).find()
      .populate("clientId").populate("serviceId").exec();
    const ans = await matrix(next, employee, req.mongo, services);
    const mat = ans.mat;
    const days = ans.days


    res.status(201).json({
      msg: "all the business",
      services,
      business,
      client: req.client,
      employee,
      queues
      , mat,
      days

    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

const matrix = async (next, employee, mongo, services) => {
  try {
    const serviceDuration = services.reduce((obj, s) => (obj[s._id] = s.duration, obj), {})
    // console.log(serviceDuration);

    const queues = await Queue(mongo).aggregate
      ([{ '$match': {} },
      { $sort: { 'hour': 1 } },
      {
        $group: {
          _id: '$day',
          hours: {
            $push: { start: "$hour", duration: '$serviceId' },
          }
        }
      },

      {
        $project: {

          hours: '$hours'

        }
      }
      ]).exec()



    const result = queues.reduce((obj, q) => (obj[moment(q._id, "yyyy/MM/DD").day().toString()] = q.hours, obj), {})



    const schedule = parse(employee.schedule)
    const ans = help(schedule);
    const range = ans[0];
    const start = ans[1];
    const end = ans[2];
    const dis = ans[3];
    const days = Object.keys(schedule).filter(e => schedule[e].length)

    // console.log(days, start, end);
    const aa =
      days.reduce((obj, d) => {
        let temp = moment(start);
        const endL = moment(schedule[d][0].end, "HH:mm")
        const startL = moment(schedule[d][0].start, "HH:mm")
        temp.add(dis, 'minutes')

        const arr = Array(range).fill(true).map((a) => {
          const an = result[d] ? result[d].every(q => {
            const start1 = moment(q.start, "HH:mm");
            const end1 = moment(q.start, "HH:mm").add(serviceDuration[q.duration], 'minutes')
            // temp.isBetween(start1, end1, undefined, '(]') && console.log(temp, start1, end1);

            return !temp.isBetween(start1, end1, undefined, '(]')
          }
          ) : true;
          // !an && console.log(temp);
          temp.add(dis, 'minutes')

          if (temp.isBetween(startL, endL, undefined, '[]') && an)
            return a;
          return false;
        })


        return (obj[d] = arr, obj)
      }, {})

    // console.log(parse(queues[0].hours));

    const daysAns = days.map(d => moment().day(d).format("yyyy/MM/DD")).sort();

    // const mat = Object.keys(aa).map(i => aa[i])
    const mat = Array.from({ length: range }, (_, i) => Object.keys(aa).map(i => aa[i]).map(col => col[i]));

    // console.log(daysAns);

    return { mat, days: daysAns };
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const parse = (jso) => JSON.parse(JSON.stringify(jso))
const help = (schedule) => {

  const list = []
  Object.keys(schedule).forEach(e =>
    schedule[e].every(e2 => list.push(e2.start, e2.end))
  )
  list.sort()
  const end = moment(list.pop(), "HH:mm")
  const start = moment(list[0], "HH:mm")
  var duration = moment.duration(end.diff(start));
  var hours = duration.asHours();
  // console.log(hours);
  const range = 10;
  const dis = 60 / range;

  return [(hours) * dis, start, end, range];
}