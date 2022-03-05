import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import HoursStyle from './opening-hours.module.scss';
import * as days from '../../../../assets';
import { Day } from '../../../../models/system/day';
import { ArrowNext, def_hour } from '../../../../assets';
import { Button, SwitchButton, SettingsHeader, Options, Breadcrumbs, Loading } from '../../../../models/ui';
import { postEmployeeSchedule } from "../../../../store"
import { getSchedule, getError, getLoading } from "../../../../store/selectors";
import * as language from '../../../../assets/language/language';

interface StateProps {
    error: string
    schedule: any;
    loading: boolean
}

interface DispatchProps {
    postEmployeeHours: typeof postEmployeeSchedule;
}
type Props = DispatchProps & StateProps;


const OpeningHours: React.FC<Props> = (props) => {
    const [Hours, setHours] = useState<Day>({ ...def_hour })
    useEffect(() => {
        props.schedule && setHours({ ...Hours, ...props.schedule })
        setHeader()
    }, []);
    const setHeader = useCallback(() =>
        (<div>
            <SettingsHeader title={language.hoursHeaderTitle[1]} subTitle={language.hoursHeaderSubTitle[1]} />
            <Breadcrumbs title={language.hoursHeaderTitle[1]} />

        </div>
        )
        , []);
    const setAnotherHeader = useCallback(() =>

        (<div className={HoursStyle.Days}>
            {days.FullHebDays.map((d: string, i: number) =>
                <p key={Math.random()} className={HoursStyle.Day} >{d}</p>
            )}
        </div>
        )
        , []);
    const header = useState<JSX.Element>(setHeader());
    const [anotherHeader] = useState<JSX.Element>(setAnotherHeader());

    const onChangeHour = (e: React.ChangeEvent<HTMLInputElement>, arg: string) => {
        const a = arg.split(',');
        const hour = e.target.value;
        const time = a[1] == "end" ? 'end' : 'start';
        const day = +a[0];

        const curHours: { start: string, end: string }[] = Hours[day];
        curHours[0][time] = hour;

        setHours({
            ...Hours, [day]: curHours
        });
    }

    const onClickAvailable = (value: boolean, id: number) => {
        setHours(value ? {
            ...Hours, [id]: [{ start: "08:00", end: "20:00" }]
        } : {
                ...Hours, [id]: []
            });
    }
    const saveChange = () => {
        props.postEmployeeHours(Hours)
    }


    const showError = props.error !== "" && props.error !== null ? props.error : null;
    const [render, setRender] = useState<JSX.Element>(<Loading />)
    useEffect(() => {

        setRender(<React.Fragment>

            {days.FullHebDays.map((d: string, i: number) => {

                const isAvailable = Hours[i].length > 0;
                return (
                    <div key={Math.random()} className={HoursStyle.DayContent}>
                        <p className={HoursStyle.Day} >{d}</p>

                        <SwitchButton key={Math.random()} state={isAvailable} onChange={onClickAvailable} id={i} />

                        <Options key={i} disabled={!isAvailable} title={language.open[1]}
                            defaultValue={'08:00'} onChange={onChangeHour} id={i + ",start"} value={isAvailable ? Hours[i][0].start : ""}
                        />
                        <Options key={Math.random()} disabled={!isAvailable} title={language.close[1]}
                            defaultValue={'24:00'} onChange={onChangeHour} id={i + ",end"} value={isAvailable ? Hours[i][0].end : ""}
                        />
                    </div>
                )
            })}
        </React.Fragment>)

    }, [Hours]);

    return (
        <div className={HoursStyle.OpeningHours}>
            {header}
            {showError && <p className={HoursStyle.Error}>{showError}</p>}
            <div className={HoursStyle.Body}>
                {anotherHeader}
                <hr />
                <div className={HoursStyle.DaysContent}>
                    {!props.loading ? render : <Loading />}
                </div>
                <div className={HoursStyle.Button}>
                    <Button color="orange" disabled={true} onClick={() => setHours({ ...def_hour, ...props.schedule })}>{language.cancelChange[1]}<ArrowNext /></Button>
                    <Button color="purple" disabled={true} onClick={saveChange}>{language.saveChange[1]}<ArrowNext /></Button>
                </div>
            </div>


        </div>
    )
}


const mapStateToProps = (state: any) => ({
    schedule: getSchedule(state),
    error: getError(state),
    loading: getLoading(state)

});


const mapDispatchToProps = (dispatch: any) => ({
    postEmployeeHours: (form: Day) => dispatch(postEmployeeSchedule(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(OpeningHours);
