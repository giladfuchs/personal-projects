
import * as language from "../../../assets/language";
import { FieldsType, account_user_role_types, link_capacity_unit_types, vendor_types, apply_option_types, apply_action_types, DropListEnum, SelectField, CheckBoxListEnum} from "../../types";
import { email, account_bandwidth_mbps, blackhole_threshold, password, username } from "../../types/form/ui_types/input-types";
import {EnumValues} from 'enum-values';
const id_key_label = (value:string)=> {
  return {id:value, key:value, label:value}
}
const parse_selects = (key:string, props_value:any): SelectField =>{
  let ans:SelectField|any= {}


  switch(key) {
  case DropListEnum.ROLE:
    ans = {  label: language.roleDropListLabel, type_selects: account_user_role_types}
    break
  case DropListEnum.LINK_CAPACITY_UNIT:
    ans = {  label: language.bandwidthTypeListLabel, type_selects: link_capacity_unit_types}
    break
  case DropListEnum.VENDOR:
    ans = {  label: language.bandwidthTypeListLabel, type_selects: vendor_types}
    break
  case DropListEnum.APPLY_ACTION:
    ans = {  label: language.bandwidthTypeListLabel, type_selects: apply_action_types}
    break
  case DropListEnum.APPLY_OPTION:
    ans = {  label: language.moderated, type_selects: apply_option_types}
    break
  // default:

  }
  ans = Object.assign({...id_key_label(key), ...ans}, {type:'select', value: props_value ? props_value: '' })

  return ans
}

const parse_key_form = (key:string, props_value:any): FieldsType => {
    
    if (EnumValues.getValues(DropListEnum).includes(key))
      return parse_selects(key, props_value)
    
    if (EnumValues.getValues(CheckBoxListEnum).includes(key))
    return {checked:props_value, ...id_key_label(key)}

  
    let ans = {...username}
    switch(key) {
      case language.password:
        ans = {...password}
        break
      case language.username:
        ans = {...username}
        break
      case language.email:
        ans = {...email}
        break
      case language.blackhole_threshold:
        ans = {...blackhole_threshold}
        break
      case language.account_bandwidth_mbps      :
        ans = {...account_bandwidth_mbps}
        break

        // break
      case language.id:
        return undefined
      default:
        ans = {...username}
        
    }

    ans = Object.assign({...ans}, {...id_key_label(key), value: props_value ? props_value: ''})
    
    return ans
  }
  export const obj_to_form = (obj_props: any) => Object.assign({},
    ...Object.keys(obj_props).map(key =>  {
    const obj = parse_key_form(key, obj_props[key])
    
    return  obj? {[key]: obj}: null
  })
  )