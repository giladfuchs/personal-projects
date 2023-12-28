import React, { useState, useContext, useEffect} from "react";
// import { Redirect } from "react-router-dom";
import { useNavigate, useParams} from 'react-router-dom';


import {  array_obj_to_obj } from "../../../services";
import { Inputs } from "./Inputs";
import {tableDataRow} from "../../types";


import {  useStylesContainer } from "../../../services";
import { useTypedSelector,  NavigationEnum, TableEnum } from "../../../store";
import { obj_to_form } from "./parse_input";
import ButtonForm from "../button/button";
import { defaultAccountForm , defaultAccountUserForm, defaultDeviceForm, defaultNetworkForm} from "../../types/form/default_form";

interface StateProps {
  navigate: NavigationEnum;
  object_type:TableEnum;

}
const getDefaultForm = (object_type : TableEnum) =>{
  switch(object_type){
    case TableEnum.ACCOUNTS:
      return defaultAccountForm
    case TableEnum.ACCOUNTS_USERS:
      return defaultAccountUserForm
    case TableEnum.DEVICES:
      return defaultDeviceForm
    case TableEnum.NETWORKS:
      return defaultNetworkForm
    }
}
const Form: React.FC <StateProps>= (props) => {
  const {loading, success_api } = useTypedSelector((state) => state.reducer)
  const table_data =  useTypedSelector((state) => state.reducer[props.object_type])
  const [navigate, params, classes] = [useNavigate(), useParams(), useStylesContainer()];
  const [form, setForm] = useState<any>({});
  useEffect(() => {
    const context_account = array_obj_to_obj(table_data, params.id)
    const defaultForm =  getDefaultForm(props.object_type) 
    const account: tableDataRow|any = Object.assign({...defaultForm}, context_account)
    setForm(obj_to_form(account))

  },[])
  
  useEffect(() => {
    !loading && success_api  &&  navigate(props.navigate)
  }, [success_api])
  return (
    <React.Fragment >
                    <Inputs form={form} setForm={setForm} />
                    <ButtonForm id={params.id}  form={form} url_path={props.navigate} />
    </React.Fragment>
  );
};


export default Form;

