import React, { useState } from 'react';
import AddServiceStyle from './add-service.module.scss';
import SerivcesSettingsStyle from '../../../../../../models/ui/header/container-header.module.scss'

import { Inputs, Button, AuthenticationHeadrer, SwitchButton, Modal } from '../../../../../../models/ui';
import { Service, plainText, Form } from '../../../../../../models';
import * as language from '../../../../../../assets/language/language'
    ;
interface OwnProps {
    close: () => void;
    fetchService: (service: Service | any) => void;
    updateService: Service | null
    error: string;
}

const AddService: React.SFC<OwnProps> = (props) => {
    const [error, setError] = useState<string>("");
    const [Available, setAvailable] = useState(props.updateService ? props.updateService.available : true);
    const [form, setForm] = useState<Form>({

        title: {
            ...plainText, label: language.servicesHeaderTitle[1],
            value: props.updateService ? props.updateService.title : ""
            , class: "line"
        },
        price: {
            ...plainText, validation: { biggerThenZero: true, minLen: 1 },
            label: language.price[1], value: props.updateService ? props.updateService.price : "",
            elementConfig: {
                id: "number"
            },
            class: "line"
        },
        duration: {
            ...plainText, validation: { biggerThenZero: true, minLen: 1 }, label: language.duration[1],
            value: props.updateService ? props.updateService.duration : "",
            elementConfig: {
                id: "number"
            }
            , class: "line"
        },
    });



    const fetchService = () => {
        if (error) return;

        const _id = props.updateService ? props.updateService._id : null;
        const ansForm = Object.assign(
            _id ? { "available": Available, _id } : { "available": Available },
            ...Object.keys(form).map((k) => {
                return ({ [k]: form[k].value })
            }))

        props.fetchService(ansForm)
    }

    const Footer = () => (
        <div className={AddServiceStyle.Button}>
            <Button onClick={() => fetchService()} color="purple" disabled={error === ""}>הוסף שירות</Button>
        </div>
    )

    const showError = error !== "" && error !== null ? error : props.error !== "" && props.error !== null ? props.error : null;

    return (
        <Modal title={language.addServiceHeaderTitle[1]} close={props.close} footer={<Footer />}>


            <div className={AddServiceStyle.Body}>
                {showError && <p className={SerivcesSettingsStyle.Error}>{showError}</p>}

                <Inputs
                    form={form} setForm={setForm} error={error} setError={setError}
                />

                <div className={AddServiceStyle.Available}>
                    <p style={Available ? { color: '#7467ef' } : { color: 'rgba(52, 49, 76, 1)' }}>
                        {Available ? language.noActivate[1] : language.activate[1]}
                    </p>
                    <SwitchButton state={Available} onChange={() => { setAvailable(!Available) }} id={9} />
                </div>
            </div>
        </Modal>
    )
}

export default AddService;


