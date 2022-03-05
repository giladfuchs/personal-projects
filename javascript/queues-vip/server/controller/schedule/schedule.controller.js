const {
    error422,
    error404,
    error403Admin, error401guest
} = require("../../utils/error/dbErrorHandler");



exports.getAllSchedule = async (req, res, next) => {
    try {
        //guset check
        const Business = require("../../models/details.model")(req.mongo);
        const buisnessDetails = await Business.findOne();
        error404(buisnessDetails);
        error401guest(req.guest, req.mongo);

        const Schedule = require("../../models/schedule.modal");

        const allSchedule = await Schedule(req.mongo).find();
        error404(allSchedule);
        res.status(201).json({
            msg: "all the schedule",
            allSchedule,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getScheduleWeek = async (req, res, next) => {
    try {
        const weekNumber = 25;
        //guset check
        const Business = require("../../models/details.model")(req.mongo);
        const buisnessDetails = await Business.findOne();
        error404(buisnessDetails);
        error401guest(req.guest, req.mongo);

        const Schedule = require("../../models/schedule.modal")(req.mongo);

        let scheduleWeek = await Schedule.findOne({ weekNumber });
        if (!scheduleWeek) {
            scheduleWeek = new Schedule({
                weekNumber,
                year: "2020",
                events: new Array(7)
            });
            await scheduleWeek.save();
        }

        error404(scheduleWeek);
        res.status(201).json({
            msg: "all the week schedule",
            scheduleWeek: scheduleWeek,
        });
    } catch (error) {
        return next(error);
    }
};


exports.postScheduleWeek = async (req, res, next) => {
    try {
        error422(req);
        const Schedule = require("../../models/schedule.modal")(req.mongo);
        error403Admin(req);
        const exist = await Schedule.find({ weekNumber }).count() > 0 ? true : false

        const { weekNumber, year, scheduleWeek } = req.body;

        const schedule = new Schedule({
            weekNumber: 25,
            year,
            events: scheduleWeek
        });

        await schedule.save();

        res.status(201).json({
            msg: "create new week schedule",
            schedule,
        });
    } catch (err) {
        return next(err);
    }
};

exports.putScheduleWeek = async (req, res, next) => {
    try {
        error422(req);
        const Schedule = require("../../models/schedule.modal")(req.mongo);
        error403Admin(req);
        const { weekNumber, year, scheduleWeek } = req.body;

        let schedule = await Schedule.findOneAndUpdate({ weekNumber }, { events: scheduleWeek, weekNumber, year }
            , { new: true });
        if (!schedule) {
            schedule = new Schedule({
                weekNumber,
                year,
                events: scheduleWeek
            });
            await schedule.save();
        }

        res.status(200).json({
            msg: "schedule update",
            scheduleWeek,
        });
    } catch (error) {
        return next(error);
    }
};

// app.get("/aaa", async (req, res, next) => {
//     try {


//       let schedule = require('../models/employee.model')(req.mongo);
//       schedule = await schedule.findOne();

//       let a = JSON.stringify(schedule.schedule)
//       a = JSON.parse(a)
//       const list = []
//       Object.keys(a).forEach(e =>
//         a[e].every(e2 => list.push(+e2.start.split(':')[0], +e2.end.split(':')[0]))
//       )
//       return res.status(200).json({ end: Math.max.apply(null, list), begin: Math.min.apply(null, list) });
//     } catch (error) {
//       next(error);
//     }
//   });