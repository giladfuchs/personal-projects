import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import SerivcesSettingsStyle from './services.module.scss';

import { postService, deleteService, updateService } from "../../../../store"
import { getError, getLoading, getServices } from "../../../../store/selectors";

import { Service } from '../../../../models';

import { Button, SettingsHeader, Breadcrumbs } from '../../../../models/ui';
import * as language from '../../../../assets/language/language'

import SerivceComp from './components/serivces.settings';
import AddService from './components/add-service/add-service.services';

interface StateProps {
    services: Service[];
    loading: boolean;
    error: string;
}

interface DispatchProps {
    postService: typeof postService;
    deleteService: typeof deleteService;
    updateService: typeof updateService;

}
type Props = DispatchProps & StateProps;


const SerivceSettings: React.FC<Props> = (props) => {

    const [ServiceToUpdate, setServiceToUpdate] = useState<Service | null>(null)
    const [Modal, setModal] = useState<boolean>(false);


    const settingHeader = useCallback(() => (
        <SettingsHeader title={language.settingTitleHeader[1]} subTitle={language.settingSubTitleHeader[1]} />
    ), []);
    const [header] = useState<JSX.Element>(settingHeader());


    if (!Modal && ServiceToUpdate) setServiceToUpdate(null);

    useEffect(() => {
        props.error === "" && !props.loading && setModal(false)
    }, [props.error, props.loading]);
    return (
        <React.Fragment>
            {Modal && <AddService close={() => setModal(false)} fetchService={ServiceToUpdate ? props.updateService : props.postService} updateService={ServiceToUpdate} error={props.error} />}
            <div className={SerivcesSettingsStyle.SerivcesSettings}>
                {header}
                <div className={SerivcesSettingsStyle.head} >

                    <Breadcrumbs title={language.settingTitleHeader[1]} />
                    <Button onClick={() => setModal(true)} color="purple" disabled={true}>{language.addNewService[1]}</Button>
                </div>

                <SerivceComp setModal={setModal}
                    setServiceToUpdate={setServiceToUpdate} />
            </div>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => ({
    services: getServices(state),
    loading: getLoading(state),
    error: getError(state),

});
const mapDispatchToProps = (dispatch: any) => ({

    deleteService: (service: Service) => dispatch(deleteService(service)),
    updateService: (service: Service) => dispatch(updateService(service)),
    postService: (form: Service) => dispatch(postService(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SerivceSettings);
