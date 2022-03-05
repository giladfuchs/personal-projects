import React, { useState, useMemo, useCallback } from 'react';

import Input from './input';

import { checkValidity } from "./utility/validator.input";
import { updateObject } from '../../../assets/utility/utility';
import { Form } from '../../system/input.field';
interface StateProps {
    form: Form;
    setForm: React.Dispatch<Form>;
    error: string | undefined | null;
    setError: React.Dispatch<string>;
}
export const Inputs: React.FC<StateProps> = (props) => {

    const [timeOut, setTimeOut] = useState<ReturnType<typeof setTimeout>>();


    const inputChanged = (form: Form, e: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) => {

        if (!form[inputIdentifier].editable) return false;
        const updatedFormElement = updateObject(form[inputIdentifier], {
            value: e.target.value,
            error: checkValidity(e.target.value, form[inputIdentifier].validation),
            touched: true,
        });
        const updatedForm = updateObject(form, {
            [inputIdentifier]: updatedFormElement,
        });
        const formIsValid = Object.keys(updatedForm).every(
            (e) => {
                if (updatedForm[e].error.length > 0) return false;
                return true;
            }
        );


        return { updatedForm, formIsValid };
    };

    const inputChangedHandler = (e: React.ChangeEvent<HTMLInputElement>, inputIdentifier: string) => {

        const ans = inputChanged(props.form, e, inputIdentifier);
        if (!ans) return;

        props.setForm(ans.updatedForm);
        props.setError("")


        if (timeOut) clearTimeout(timeOut);
        setTimeOut(setTimeout(() => {
            if (!ans.formIsValid) {
                const index = Object.keys(ans.updatedForm).filter(it => !ans.updatedForm[it].valid && ans.updatedForm[it].touched).pop();
                !index ? props.setError("") : props.setError(ans.updatedForm[index].error)
            }
        }, 700))
    }


    const formElementsArrayfunc = useCallback(() => (Object.keys(props.form).map((key) => {
        return {
            _id: key,
            config: props.form[key],
        };
    }).map((formElement: any) => (
        <Input
            type={formElement.config.type}
            key={formElement._id}
            label={formElement.config.label}
            style={formElement.config.style}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(e) => inputChangedHandler(e, formElement._id)}
            class={formElement.config.class}
            name={formElement._id}
        />)
    )), [props.form]);


    const [formElementsArray, setformElementsArray] = useState<JSX.Element[]>(formElementsArrayfunc());
    useMemo(() => {
        setformElementsArray(formElementsArrayfunc())
    }, [formElementsArrayfunc]);

    return (
        <div>

            {formElementsArray}

        </div>
    );
};


