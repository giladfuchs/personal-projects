import React, { useState, useEffect, useCallback } from 'react';

import { connect } from "react-redux";

import BusinessSettingsStyle from './business-settings.module.scss';
import { postBusinessDetails } from "../../../../store"
import { getBusiness, getError, getLoading } from '../../../../store/selectors';

import SocialMediaLinks from './social-media-links/social-media-links';
import { postingImg } from '../../../../assets/images/export-images'
import { Button, SettingsHeader, Inputs, Breadcrumbs, Loading } from '../../../../models/ui';
import { ArrowNext } from '../../../../assets'
import { plainText, phone, email, Form, BusinessDetails } from '../../../../models';
import * as language from '../../../../assets/language/language';




interface StateProps {
    business: any
    error: string
    loading: boolean
}

interface DispatchProps {
    postDetails: typeof postBusinessDetails;
}
type Props = DispatchProps & StateProps;

const BusinessSettings: React.FC<Props> = (props) => {

    useEffect(() => {
        console.log(props.business);

        if (props.business) {
            setForm(Object.assign({}, ...Object.keys(form).map((k) => {
                return ({ [k]: { ...form[k], value: props.business.details[k] || props.business.otherData[k] } })
            })))
            // setLinks(props.business.otherData.links)
        }
    }, []);
    const [Links, setLinks] = useState({
        "facebook": "",
        "instagram": ""
    })
    const [Edit, setEdit] = useState<boolean>(false)

    const [form, setForm] = useState<Form>({
        organization: {
            ...plainText, elementConfig: {
                id: "organization",
                placeholder: language.businessName[1],
            },
            editable: false,
            label: language.businessName[1],
        },
        address: {
            ...plainText, elementConfig: {
                id: "street-address",
                placeholder: language.address[1],
            }, label: language.address[1],
            validation: {
                required: true,
                minLen: 4,
            },
            editable: false,
        },
        phone: {
            ...phone,
            editable: false,
        }
        ,
        logo: {
            ...plainText, label: "לוגו"
        },
        about: {
            ...plainText, label: "אודות", elementType: 'textArea',
            validation: {
                required: true,
                minLen: 4,
            },
            editable: false,
        },
    });
    const [error, setError] = useState<string>("");

    const settingHeader = useCallback(() => (<div>
        <SettingsHeader title={language.businessSettingHeaderTitle[1]} subTitle={language.businessSettingHeaderSubTitle[1]} />
        <Breadcrumbs title={language.businessSettingHeaderTitle[1]} />
    </div>
    ), []);
    const [header] = useState(settingHeader());

    const updateDetails = () => {
        const ansForm = Object.assign(
            { Links },
            ...Object.keys(form).map((k) => {
                return ({ [k]: form[k].value })
            }))
        const businessDetails: BusinessDetails = {
            details: {
                organization: ansForm.organization,
                address: ansForm.address,
                phone: ansForm.phone,
            },
            otherData: {
                logo: ansForm.logo,
                about: ansForm.about,
                guestPermission: true,

            }

        }
        props.postDetails(businessDetails)
    }
    const edit = () => {
        setEdit(true)
        setForm(Object.assign({}, ...Object.keys(form).map((k) => {
            return ({ [k]: { ...form[k], editable: true } })
        })))
    }
    const cancel = () => {
        setEdit(false)

        setForm(Object.assign({}, ...Object.keys(form).map((k) => {
            return ({ [k]: { ...form[k], value: props.business.details[k] || props.business.otherData[k], editable: false } })
        })))
        // setLinks(props.details.links)

    }
    const showError = error !== "" && error !== null ? error : props.error !== "" && props.error !== null ? props.error : null;

    return (
        <React.Fragment>

            <div className={BusinessSettingsStyle.BusinessSettings}>
                {showError && <p className={BusinessSettingsStyle.Error}>{showError}</p>}
                {props.loading ?
                    <Loading />
                    :
                    <div className={BusinessSettingsStyle.Head}  >

                        {header}
                        <div className={BusinessSettingsStyle.Button}>

                            {Edit ? <div>     <Button onClick={() => cancel()} color="orange" disabled={true}>ביטול <ArrowNext /></Button>
                                <Button onClick={() => updateDetails()} color="purple" disabled={true}>שמירה שינויים <ArrowNext /></Button>
                            </div> : <Button onClick={() => edit()} color="purple" disabled={true}>עריכה <ArrowNext /></Button>
                            }</div>
                    </div>}
                <div className={BusinessSettingsStyle.Body}>
                    <div className={BusinessSettingsStyle.Details}>
                        <Inputs
                            form={form} setForm={setForm} error={error} setError={setError}
                        />
                        <SocialMediaLinks onChange={() => { }} Links={Links} iconColor="#7467ef" style={{ width: '300px' }} />
                    </div>

                    <div className={BusinessSettingsStyle.Photo}>
                        <img src={postingImg} alt="" />
                    </div>

                </div>



            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state: any) => ({
    business: getBusiness(state),
    error: getError(state),
    loading: getLoading(state)
});


const mapDispatchToProps = (dispatch: any) => ({
    postDetails: (form: BusinessDetails) => dispatch(postBusinessDetails(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessSettings);
