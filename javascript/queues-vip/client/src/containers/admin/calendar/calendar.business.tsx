import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';

import moment from 'moment';

import CalendarStyle from './calendar.module.scss';

import { getDurationOfNewQueue, getPrice, getServices, getMat, getDays, getStartMinTime, getTimeDistance, getPerson, getLoading } from '../../../store/selectors';
import { updateScheduleWeek } from '../../../store';

import * as helper from './components/helper';
import NewQueue from './components/add-new-queue/add-new-queue.calendar';

import { Client, Service, Queue } from '../../../models/system';
import { Button } from '../../../models';



interface StateProps {
    services: Service[],
    person: Client,
    days: [],
    mat: boolean[][],
    startMinTime: number,
    loading: boolean,
    timeDistance: number,
    durationOfNewQueue: number,
    price: number,



}
interface OwnProps {
    isScriptLoaded: boolean;
    isScriptLoadSucceed: boolean
}
interface DispatchProps {
    updateScheduleWeek: typeof updateScheduleWeek;
}

type Props = DispatchProps & StateProps & OwnProps;
const CalendarUser: React.FC<Props> = (props) => {
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [Time, setTime] = useState<{ date: string, hour: string }>({ date: "", hour: "" });

    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        (props.isScriptLoaded && props.isScriptLoadSucceed) &&
            setStripe(window.Stripe('pk_test_0vhbUGgLB4Lt9JojLBgMvJIv00uaF8SW90'));
    }, [props.isScriptLoaded, props.isScriptLoadSucceed]);


    const [slots, setSlots] = useState<(JSX.Element | null)[]>()

    // Hold the table
    useEffect(() => {

        let time: number = 0;
        setSlots(
            props.mat.map(element => {
                const hour = moment(props.startMinTime, "HH:mm").minutes(time).format("HH:mm");
                time += props.timeDistance;
                return element.every(e => !e) ? null :
                    (
                        <tr key={hour}>
                            <td className={CalendarStyle.Hours} style={{ cursor: 'initial' }}>{hour}</td>
                            {
                                element.map((day: boolean, index: number) => {
                                    if (!day) {
                                        return (
                                            <td key={hour + ',' + props.days[index]} className={CalendarStyle.Slot + " " + CalendarStyle.Event}
                                                style={{ cursor: "not-allowed" }}>
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={hour + ',' + props.days[index]} className={CalendarStyle.Slot} onClick={() => onSlotClick(hour, props.days[index])}></td>
                                    );
                                })
                            }
                        </tr>
                    );
            })
        )
    }, [props.mat, props.startMinTime]);

    ;

    const addNewEvent = (paymentMethood: boolean) => {

        const event: Queue = {
            serviceId: props.services[0]._id || "",
            clientId: props.person._id || "",
            day: Time.date,
            hour: Time.hour,
            duration: props.durationOfNewQueue
        }
        console.log(typeof stripe);

        props.updateScheduleWeek(event, paymentMethood ? stripe : null)
    }

    const onSlotClick = (hour: string, date: string) => {
        setOpenModal(true);
        setTime({ date, hour });
    }

    const week = props.days.map(d => moment(d).day())

    // Return days and dats(The first row of table)
    const curMonth = useCallback(() => (
        helper.monthNumberToHeb(moment(new Date()).month() + 1)
    ), []);
    const days = useCallback(() => (
        props.days.map((day: string, i: number) => {
            console.log("callback");

            return (
                <th key={day}>
                    {helper.hebDays[week[i]]}
                    <br />
                    {moment(day.toString(), "yyyy/MM/DD").format('DD/MM')}
                </th>
            );
        })
    ), []);

    return props.loading ? <p>loading ....</p>
        : (
            <React.Fragment>
                {OpenModal && <NewQueue date={Time} close={() => setOpenModal(false)}
                    addNewEvent={addNewEvent} duration={props.durationOfNewQueue} price={props.price} />}
                <div className={CalendarStyle.Calendar}>
                    <div className={CalendarStyle.Header}>
                        <Button color='orange' disabled={true} onClick={() => { }}>שבוע קודם</Button>
                        <Button color='purple' disabled={true} onClick={() => { parseInt(moment(new Date()).format('WW')) }}>שבוע נוכחי</Button>
                        <Button color='orange' disabled={true} onClick={() => { }}>שבוע הבא</Button>

                    </div>
                    <div className={CalendarStyle.Content}>
                        <table >
                            <tbody>
                                <tr>
                                    <th className={CalendarStyle.TableHeader}>
                                        {curMonth()}
                                    </th>
                                    {days()}
                                </tr>
                                {slots}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
}

const mapStateToProps = (state: any) => ({
    services: getServices(state),
    person: getPerson(state),
    days: getDays(state),
    mat: getMat(state),

    startMinTime: getStartMinTime(state),
    loading: getLoading(state),
    timeDistance: getTimeDistance(state),
    durationOfNewQueue: getDurationOfNewQueue(state),
    price: getPrice(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    updateScheduleWeek: (queue: Queue, stripe: any) => dispatch(updateScheduleWeek(queue, stripe)),
});

export default scriptLoader('https://js.stripe.com/v3/')(connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CalendarUser));