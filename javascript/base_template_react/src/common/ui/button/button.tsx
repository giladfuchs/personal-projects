import React from 'react';
import {Button} from '@mui/material';
import { useActions } from '../../../store';


interface StateProps {
    form: any;
    id: any;
    url_path: any;
  }
const ButtonForm: React.FC<StateProps> = (props) => {
  const { send_form, update_form } =  useActions()


 
  
  return (
    <Button
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    onClick={() => {
      const form_values =   Object.keys(props.form).map((key:string) =>
       {return {[key]: props.form[key].value? props.form[key].value : props.form[key].checked}})

       const obj_from_form =Object.assign({}, ...JSON.parse(JSON.stringify(form_values)))
      
      props.id ? update_form(props.url_path, obj_from_form, props.id): send_form(props.url_path, obj_from_form) 

    }}
  >
              {props.id ? 'Update': 'Add'}
  </Button>
  );
};
export default ButtonForm;