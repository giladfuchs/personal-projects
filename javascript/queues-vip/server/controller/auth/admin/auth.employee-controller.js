const mongoose = require("mongoose");
const Temporary = require("../../../models/temporary-employee.model");
const Domain = require("../../../models/domain.model");

const { errorPassword401, error404, error422 } = require("../../../utils/error/dbErrorHandler");
const { createToken, mail } = require("../../helper/helper.controller");

const bcrypt = require("bcrypt");

exports.firstRegister = async (req, res, next) => {
    try {
        error422(req);

        const employeeBody = { ...req.body };
        const domain = req.get("domain");


        const hashedPw = await bcrypt.hash(employeeBody.password, 12);
        const authPass = Math.random().toString().slice(2, 6);
        const employeeTemp = new Temporary({
            ...employeeBody, password: hashedPw, authPass, domain
        });
        await employeeTemp.save();


        const { firstName, lastName, phone, email } = employeeTemp

        //need to send email
        // await mail(email, authPass);

        res.status(201).json({ message: "email with pass sent", authPass, employee: { _id: employeeTemp._id, firstName, lastName, phone, email } });
    } catch (error) {
        return next(error);
    }
};

exports.approveFirstRegister = async (req, res, next) => {
    try {



        const employeeBody = { ...req.body };


        let employeeTemp = await Temporary.findById(employeeBody._id);
        error404(employeeTemp)

        errorPassword401(employeeTemp.authPass === employeeBody.authPass)

        const domain = req.get("domain");

        const emp = { domain, firstName: employeeTemp.firstName, lastName: employeeTemp.lastName, phone: employeeTemp.phone, email: employeeTemp.email, password: employeeTemp.password };


        await Temporary.findOneAndDelete(employeeBody._id);
        const token = await register(next, emp);


        res.status(200).json({ message: "aprrove register", token });
    } catch (error) {
        return next(error);
    }
};

const register = async (next, employeeBody) => {
    try {

        const mongo = mongoose.connection.useDb(employeeBody.domain);
        const Employee = require("../../../models/employee.model")(mongo);
        // const session = await Employee.startSession();
        // session.startTransaction();
        // const opts = { session };

        const domaina = new Domain({
            ...employeeBody
        });

        const { password, domain } = employeeBody;
        delete employeeBody.password;
        delete employeeBody.domain;
        const employee = new Employee({
            details: { ...employeeBody },
            otherData: {
                password,
                domain
            }
        });
        await employee.save();




        await domaina.save();
        // connect(mongo)
        // await session.commitTransaction();
        // session.endSession();
        const token = createToken(employee);


        return (token);
    } catch (error) {
        return next(error);
    }
}
        // connect(mongo)

const connect = (mongo) => {
    require('../models/service.model')(mongo)
    require('../models/client.model')(mongo)
    require('../models/employee.model')(mongo)
    require('../models/details.model')(mongo)
    require('../models/queue.model')(mongo)

}

exports.register = async (req, res, next) => {
    try {
        error422(req);
        const domain = req.get("domain");
        const employeeBody = { ...req.body, domain };
        const token = await register(next, employeeBody);
        res.status(201).json({ message: "create new business", token });
    } catch (error) {
        return next(error);
    }
};



exports.employeeLogin = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        const domain = await Domain.findOne({ phone: phone });
        error404(domain);

        req.mongo = mongoose.connection.useDb(domain.domain);
        const Employee = require("../../../models/employee.model")(req.mongo);

        const employee = await Employee.findOne({ 'details.phone': phone });
        error404(employee);

        const isEqual = await bcrypt.compare(password, employee.otherData.password);
        errorPassword401(isEqual);

        const token = createToken(employee);

        res.status(200).json({
            message: "employee login success",
            token,
            domain: domain.domain,
        });
    } catch (error) {
        return next(error);
    }
};


exports.check = async (req, res, next) => {
    try {
        res.status(200).json({ domains: req.domains });
    } catch (error) {
        next(error);
    }
}
