const { errorPassword401, error404, error422 } = require("../../../utils/error/dbErrorHandler");
const { createToken } = require("../../helper/helper.controller");


exports.clientRegister = async (req, res, next) => {
    try {


        error422(req)
        const Client = require("../../../models/client.model")(req.mongo);

        const client = new Client({ details: { ...req.body } });
        await client.save();

        const token = createToken(client);


        res.status(200).json({ message: "aprrove register", token, client });
    } catch (error) {
        return next(error);
    }
}





exports.clientLogin = async (req, res, next) => {
    try {

        error422(req)
        const Client = require("../../../models/client.model")(req.mongo);

        const client = await Client.findOne({ "details.phone": req.body.phone })
        error404(client)

        const token = createToken(client);


        res.status(200).json({ message: "login", token, client });
    } catch (error) {
        return next(error);
    }
};


