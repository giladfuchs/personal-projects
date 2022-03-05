import React, { useState, useEffect, useCallback, JSXElementConstructor } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";

import SerivcesSettingsStyle from './services.module.scss';
import { MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md';
import { ArrowNext } from '../../../assets';
import * as language from '../../../assets/index'

import { setServiceToQueue } from "../../../store/index"
import { getServices, getMat, getError, getLoading } from "../../../store/selectors";

import { Service, ServiceListQueue } from '../../../models';
import { Button } from '../../../models/ui';

interface StateProps {
    services: Service[],
    error: string,
    loading: boolean,
    mat: boolean[][]
}

interface DispatchProps {
    setServiceToQueue: typeof setServiceToQueue;
}
type Props = DispatchProps & StateProps;

const SerivceComp: React.FC<Props> = (props) => {

    const [Services, setServices] = useState<JSX.Element[]>([]);
    const [header, setHeader] = useState<JSX.Element>();
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setHeader(settingHeader())

    }, []);
    const settingHeader = useCallback(() => (
        <thead className={SerivcesSettingsStyle.TableHeader}>
            <tr>
                <th>{language.serviceName[1]}</th>
                <th>{language.price[1]}</th>
                <th>{language.duration[1]}</th>
                <th>{language.commands[1]}</th>
            </tr>
        </thead>
    ), []);

    const [count, setCount] = useState(props.services
        .reduce((json: any, s: Service) => { json[s._id] = 0; return json; }, {})
    );
    const increaseService = (_id: string) => {
        setError("")
        setCount({ ...count, [_id]: count[_id] + 1 })
    }
    const decreaseService = (_id: string) => {
        const temp = count[_id] > 1 ? count[_id] - 1 : 0;
        setCount({ ...count, [_id]: temp })
    }
    useEffect(() => {
        setServices(
            props.services.map((s: Service) => {
                const _id = s._id || "0";
                return (
                    <tr key={_id}>
                        <td>{s.title}</td>
                        <td>₪{s.price}</td>
                        <td>{s.duration}</td>
                        <td>
                            <MdAddShoppingCart onClick={() => increaseService(_id)} color="#7467ef" />
                            {count[_id]}
                            <MdRemoveShoppingCart onClick={() => decreaseService(_id)} color="#e62163" />
                        </td>
                    </tr>)
            }
            )
        )
    }, [count]);

    const onClickNext = () => {
        const duration = Object.keys(count).reduce((acc, index) => acc + count[index], 0)
        if (duration)
            props.setServiceToQueue(count)
        else
            setError(language.chooseMinOneService[1])

    };
    const [redirect, setRedirect] = useState<JSX.Element>();

    useEffect(() => {
        error != null && error === '' && setRedirect(
            <Redirect to={localStorage.getItem('domain') + "/calendar"} />)

    }, [props.mat]);

    return (
        <React.Fragment>
            {redirect}
            <div className={SerivcesSettingsStyle.Service}>
                <div className={SerivcesSettingsStyle.SerivcesSettings}>
                    <div className={SerivcesSettingsStyle.Services}>
                        {error && <p className={SerivcesSettingsStyle.Error}>{error}</p>}
                        <table>
                            {header}
                            <tbody>
                                {Services}
                            </tbody>
                        </table>
                    </div>
                    <div className={SerivcesSettingsStyle.Button} onClick={onClickNext}>
                        <Button color="purple" disabled={error === "" && !props.loading} >{language.next[1]}<ArrowNext /></Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    services: getServices(state),
    error: getError(state),
    mat: getMat(state),
    loading: getLoading(state)

});
const mapDispatchToProps = (dispatch: any) => ({
    setServiceToQueue: (services: ServiceListQueue) => dispatch(setServiceToQueue(services)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SerivceComp);

