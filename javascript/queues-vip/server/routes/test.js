const router = require("express").Router();


// let services = await Service.find().select('duration _id')

// services =
//   services.map((s) => {
//     return { [s._id]: s.duration }
//   })
const map = {
    '5ef4ba236977cb2b97cdde0e': 30,
    '5ef632836e3c3c0be002ae75': 40,
    '5ef632946e3c3c0be002ae76': 20
}
router.get("/", async (req, res, next) => {
    try {
        const Queue = require('../models/queue.model')(req.mongo)
        const Service = require('../models/service.model')(req.mongo)
        const Employee = require('../models/employee.model')(req.mongo)
        const employee = await Employee.findOne();
        const queues = await Queue.aggregate
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


        var result = {};
        for (var i = 0; i < queues.length; i++) {
            result[moment(queues[i]._id, "yyyy/MM/DD").day().toString()] = queues[i].hours;
        }
        // console.log(queues, result);



        const schedule = parse(employee.schedule)
        const ans = help(schedule);
        const range = ans[0];
        const start = ans[1];
        const end = ans[2];
        const dis = ans[3];
        const days = Object.keys(schedule).filter(e => schedule[e].length)

        // console.log(days);
        const aa =
            days.reduce((obj, d) => {
                let temp = moment(start);
                const endL = moment(schedule[d][0].end, "HH:mm")
                const startL = moment(schedule[d][0].start, "HH:mm")
                const arr = Array(range).fill(true).map((a) => {
                    temp.add(dis, 'minutes')
                    const an = result[d].every(q => {
                        const start1 = moment(q.start, "HH:mm");
                        const end1 = moment(q.start, "HH:mm").add(map[q.duration], 'minutes')
                        return !temp.isBetween(start1, end1)
                    }
                    );
                    if (temp.isBetween(startL, endL) && an)
                        return a;
                    return false;
                })

                return (obj[d] = arr, obj)
            }, {})

        // console.log(aa);


        const daysAns = queues.map(q => q._id);
        // const mat = Object.keys(aa).map(i => aa[i])
        const mat = Array.from({ length: range }, (_, i) => Object.keys(aa).map(i => aa[i]).map(col => col[i]));

        console.log(mat, daysAns);

        return res.status(200).json({ queues, week: mat, days: daysAns });
    } catch (error) {
        console.log(error);

        next(error);
    }
});


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

module.exports = router;
      // queues =
      //   queues.map(q => {
      //     const day = moment(q._id).day().toString() || '1';
      //     // console.log(day);

      //     return { [day]: q.hours }
      //   })


      // console.log(Object.keys(req.mongo["base"]['modelSchemas']));
      // Object.keys(req.mongo)


      // {
      //   "$lookup": {
      //     "from": "services",
      //     "localField": "serviceId",
      //     "foreignField": "duration",
      //     "as": "from"
      //   }
      // }

      // let queues = await Queue.aggregate
      // ([{ '$match': {} },

      // { $sort: { 'hour': 1 } },
      // {
      //   $group: {
      //     _id: '$day',
      //     hours: {
      //       $push: { start: "$hour", duration: '$serviceId' },
      //     }
      //   }
      // },
      // {
      //   $lookup: {
      //     from: 'services',
      //     localField: 'serviceId',
      //     foreignField: 'serviceId',
      //     as: 'serviceId'
      //   }
      // }
      //   ,
      // {
      //   $unwind: '$serviceId'
      // },
      // {
      //   $project: {
      //     duration: '$serviceId.duration',
      //     hours: '$hours'

      //   }
      // }
      // ]).exec()