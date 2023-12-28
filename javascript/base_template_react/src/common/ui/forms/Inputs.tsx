import React, { useState, useMemo, useEffect, useCallback } from "react";
import {Alert, Stack, Box} from '@mui/material';
import Input from "./Input";
import {Form} from "../../types";

import { checkValidity, updateObject } from "../../../services";
import { useTypedSelector } from "../../../store";
interface StateProps {
  form: Form;
  setForm: any;
}
export const Inputs: React.FC<StateProps> = (props) => {
  const inputChanged = (
    form: Form,
    e: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    let updatedFormElement;

    if (form[inputIdentifier].hasOwnProperty('validation')){
    const valid = checkValidity(
      e.target.value,
      form[inputIdentifier].validation
    );

    const validBool = valid !== "" ? true : false;
     updatedFormElement = updateObject(form[inputIdentifier], {
      value: e.target.value,
      error: validBool,
      valid: validBool,
      helperText: valid,
      touched: true,
    });}
    else if (form[inputIdentifier].hasOwnProperty('checked')){
      updatedFormElement = updateObject(form[inputIdentifier], {
        checked: e.target.checked,
      
      })
    }
    else{
      updatedFormElement = updateObject(form[inputIdentifier], {
        value: e.target.value,
      
      })
    }

    const updatedForm = updateObject(form, {
      [inputIdentifier]: updatedFormElement,
    });

    return updatedForm;
  };

  const inputChangedHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    const updatedForm = inputChanged(props.form, e, inputIdentifier);
    if (!updatedForm) return;
    props.setForm(updatedForm);
  };

  const formElementsArrayfunc = useCallback(
    () =>
      Object.keys(props.form)
        .map((key) => {
          return {
            id: key,
            config: props.form[key],
          };
        })
        .map((formElement: any) => {
            const config =  {...formElement.config }
            delete config.touched;
            delete config.valid;
          return <Input
            {...config }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputChangedHandler(e, formElement.id)
            }
          />
          }),
    [props.form]
  );

  const [formElementsArray, setformElementsArray] = useState<JSX.Element[]>(
    formElementsArrayfunc()
  );
  useMemo(() => {
    setformElementsArray(formElementsArrayfunc());
  }, [formElementsArrayfunc]);
  const error_context: string = useTypedSelector((state) => state.reducer.error)
  const [errorField, setErrorField] = useState<any>();
  useEffect(() => {
    setErrorField(<Stack sx={{ width: '100%' }} spacing={2}>
    {error_context !== '' ?<Alert severity="error">{error_context}</Alert>
 :null }</Stack>)

  }, [error_context])
  
  return   <Box
  sx={{
    width: '35rem',
  //  height: '40rem',
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'primary.dark',

  }}
>
    <div style={{'height':'85%', }}>
      {formElementsArray}
    </div>

    <div style={{'height':'15%'}}>
    {errorField}
 
    </div>

 </Box>;
};
