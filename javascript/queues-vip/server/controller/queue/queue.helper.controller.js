
const Queue = require("../../models/queue.model");

const moment = require('moment')


const formatHour = new String("HH:mm")

const minutes = new String("minutes")
const formatDay = new String("yyyy/MM/DD")

exports.matrix = async (next, schedule, mongo, services, timeDistance, servicesListOfNewQueue = {}) => {

  try {
    const queues = await queuesClientQuery(next, mongo);

    const daysOfWorking = Object.keys(schedule).filter(e => schedule[e].length)
    const days = daysOfWorking.map(d => moment().day(d).format(formatDay)).sort();

    const ans = arrayDayLen_EndMaxTime(schedule, timeDistance);
    const arrayDayLen = ans[0];
    const endMaxTime = ans[1];

    const serviceDuration = serviceDurationCalc(services);
    const durationOfNewQueue =
      Object.keys(servicesListOfNewQueue).reduce((acc, index) =>
        acc + (serviceDuration[index].duration * servicesListOfNewQueue[index]), 0)
    const price =
      Object.keys(servicesListOfNewQueue).reduce((acc, index) =>
        acc + (serviceDuration[index].price * servicesListOfNewQueue[index]), 0)

    //calc it from the and to start
    const objectDaysArray =
      daysOfWorking.reduce((obj, d) => {
        let tempTime = moment(endMaxTime).add(1, minutes);
        const endEachDay = moment(schedule[d][0].end, formatHour)

        const startEachDay = moment(schedule[d][0].start, formatHour)

        let arrayDay = Array.from({ length: arrayDayLen }).map(() => {
          tempTime = moment(tempTime).subtract(timeDistance, minutes)

          return queues[d] ? queues[d].every(q => {
            const startTimeQueue = moment(q.start, formatHour);
            const endTimeQueue = moment(q.start, formatHour).add(q.duration, minutes)
            return !tempTime.isBetween(startTimeQueue, endTimeQueue, undefined, '()');
          }) : true
        });

        tempTime = moment(endMaxTime).subtract(1, minutes);

        arrayDay = arrayDay.reduce((acc, cell, i) => {
          const cellsToQueue = durationOfNewQueue / timeDistance;
          let check = cell;

          //if it's room for the duration
          check &= !cellsToQueue || (acc.length >= cellsToQueue - 1 && i - cellsToQueue + 1 < i)
            && arrayDay.slice(i - cellsToQueue + 1, i).every(t => t);

          //if he working in this time
          check &= tempTime.isBetween(startEachDay, endEachDay, undefined, '()');

          tempTime = moment(tempTime).subtract(timeDistance, minutes)

          return acc.concat(check ? true : false);
        }, [])

        return (obj[d] = [...arrayDay].reverse(), obj)
      }, {})



    const mat = Array.from({ length: arrayDayLen }, (_, i) => Object.keys(objectDaysArray).map(i => objectDaysArray[i]).map(col => col[i]));



    return { mat, days, startMinTime: ans[2], durationOfNewQueue, price };
  } catch (error) {

    next(error);
  }
};

const queuesClientQuery = async (next, mongo) => {

  try {
    let queues = await Queue(mongo).aggregate
      ([{ '$match': {} },
      { $sort: { 'hour': 1 } },
      {
        $group: {
          _id: '$day',
          hours: {
            $push: { start: "$hour", duration: '$duration' },
          }
        }
      },
      {
        $project: {
          hours: '$hours'
        }
      }
      ])
      .exec()
    queues = queues.reduce((obj, q) => (obj[moment(q._id, formatDay).day().toString()] = q.hours, obj), {})

    return queues;
  } catch (error) {

    next(error);
  }
};
const serviceDurationCalc = (services) => services.reduce((obj, s) => (obj[s._id] = { duration: s.duration, price: s.price }, obj), {})

exports.parseJsonMongo = (jso) => JSON.parse(JSON.stringify(jso))
const arrayDayLen_EndMaxTime = (schedule, timeDistance) => {

  const maxMinStartEnd = Object.keys(schedule).reduce((acc, day) =>
    acc.concat(...schedule[day].map(time => [time.start, time.end]))
    , []).sort()


  const end = moment(maxMinStartEnd.pop(), formatHour)
  const start = moment(maxMinStartEnd[0], formatHour)

  var duration = moment.duration(end.diff(start));

  var hours = duration.asHours();
  const queueInHour = 60 / timeDistance;

  return [hours * queueInHour, end, maxMinStartEnd[0]];
}


















