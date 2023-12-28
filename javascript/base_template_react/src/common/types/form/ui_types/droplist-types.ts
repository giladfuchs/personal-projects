import { CheckBoxField } from "../..";
import * as language from "../../../../assets/language";
// accout user 
export const account_user_role_types = [ 'Account and Child Accounts Admin',
  'Account Admin',
    'Child Accounts Admin',
    'Account Viewer',  'Child Accounts Viewer']   as const;

export type Role = typeof account_user_role_types[number];


// account device
export const link_capacity_unit_types = [ 'MB', 'GB']   as const;
export type LINK_CAPACITY_UNIT = typeof link_capacity_unit_types[number];

//device

export const vendor_types = ['cisco', 'juniper', 'arista', 'mikrotik']   as const;
export type Vendor = typeof vendor_types[number];

export const apply_action_types = [ 'accept',
'discard',
'rate-limit']   as const;
export type APPLY_ACTION = typeof apply_action_types[number];

export const apply_option_types = ['moderated', 'auto']   as const;
export type APPLY_OPTION = typeof apply_option_types[number];


export enum DropListEnum {
  ROLE = 'role',
  LINK_CAPACITY_UNIT = "link_capacity_unit",
  VENDOR = "vedor",
  APPLY_ACTION = "apply_action",
  APPLY_OPTION = "moderated",
  
}

export type DropListTypes =LINK_CAPACITY_UNIT | Role | Vendor
// export type DropListTypes =typeof account_user_role_types | typeof link_capacity_unit_types
