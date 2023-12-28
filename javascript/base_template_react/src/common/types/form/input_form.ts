import { DropListTypes, Role } from "..";

export interface BaseField  {
    key?:string;
    id: string;
    label: string;
    type?: string;

}
export interface SelectField  extends BaseField {
    type_selects:DropListTypes;
    value: string;

}
export interface CheckBoxField  extends BaseField {
    checked:boolean;

}
export interface InputField extends BaseField{
    value: string;
    autoComplete: string;
    error: boolean;
    helperText: string;
    validation: any;
    valid: boolean;
    touched: boolean;
  };
  
  export type FieldsType = InputField | SelectField| CheckBoxField|undefined;
  export type Form = {
    [type: string]: InputField;
  };
  
  