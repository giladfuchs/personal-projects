import React, { useState, useCallback, useMemo } from 'react';
import { connect } from "react-redux";
import SerivcesSettingsStyle from '../services.module.scss';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { ArrowNext } from '../../../../../assets';
import * as language from '../../../../../assets/language/language'
import { deleteService } from "../../../../../store"
import { getIsAdmin, getError, getServices } from "../../../../../store/selectors";
import { Service } from '../../../../../models/system/service';
import { Button } from '../../../../../models/ui';

interface OwnProps {
    setModal: (flag: boolean) => void;
    setServiceToUpdate: (service: Service) => void
}

interface StateProps {
    services: Service[];
    error: string,
    isAdmin: boolean
}

interface DispatchProps {

    deleteService: typeof deleteService;


}
type Props = DispatchProps & StateProps & OwnProps;

const SerivceComp: React.FC<Props> = (props) => {
    const { setModal, setServiceToUpdate } = props;
    const [Services, setServices] = useState<JSX.Element[]>();

    const settingHeader = useCallback(() => (
        <thead className={SerivcesSettingsStyle.TableHeader}>
            <tr>
                <th>{language.serviceName[1]}</th>
                <th>{language.price[1]}</th>
                <th>{language.duration[1]}</th>
                {props.isAdmin && <th>{language.available[1]}</th>}
                <th>{language.commands[1]}</th>
            </tr>
        </thead>
    ), [props.isAdmin]);
    const [header] = useState<JSX.Element>(settingHeader());


    useMemo(() => {

        setServices(
            props.services.map((s: Service) =>
                <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>₪{s.price}</td>
                    <td>{s.duration}</td>
                    <td>
                        {s.available ?
                            <p className={SerivcesSettingsStyle.Available} style={{ background: '#7467ef' }}>{language.noActivate[1]}</p> :
                            <p className={SerivcesSettingsStyle.Available} style={{ color: 'rgba(52, 49, 76, 1)' }}>{language.activate[1]}</p>
                        }
                    </td>
                    <td>
                        <MdDelete onClick={() => props.deleteService(s)} color="#e62163" />

                        <MdModeEdit onClick={() => {
                            setServiceToUpdate(s);
                            setModal(true)
                        }} color="#7467ef" />

                    </td>
                </tr>
            )
        )
    }, [props.services]);

    return (
        <React.Fragment>

            <div className={SerivcesSettingsStyle.Services}>
                <table>
                    {header}
                    {props.error && <p className={SerivcesSettingsStyle.Error}>{props.error}</p>}
                    <tbody>
                        {Services}
                    </tbody>
                </table>
            </div>

        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    services: getServices(state),
    error: getError(state),
    isAdmin: getIsAdmin(state)

});
const mapDispatchToProps = (dispatch: any) => ({
    deleteService: (service: Service) => dispatch(deleteService(service)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SerivceComp);
