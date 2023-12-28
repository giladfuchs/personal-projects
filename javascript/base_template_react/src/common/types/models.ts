
import {EnumValues} from 'enum-values';
import { LINK_CAPACITY_UNIT, Role, Vendor, APPLY_ACTION, APPLY_OPTION } from '.';

export interface LoginForm {
  username: string;
  password: string;
};

export interface DeviceForm {
  id?: string;
  name: string;
  vendor:Vendor;
  apply_action: APPLY_ACTION;
  moderated: APPLY_OPTION;

};


export interface NetworkForm {
  id?: string;
  ip: string;
  mask:number;
  rate_limit: boolean;
  holistic: boolean;


};



export interface AccountUserForm  {
  id?: string;
  role: Role;
  name: string;
  username: string;
  password: string;
  phone?: string;
  email?: string;
};

export interface AccountForm  {
  id?: string;
  name: string;
  type: string;
  link_capacity_unit: LINK_CAPACITY_UNIT;
  account_bandwidth_mbps: number;
  asns: number[];
  blackhole: boolean;
  rate_limit: boolean;
  blackhole_threshold: number;
  address: string;
  phone: number;
  state: string;
  website: string;
  zip: string;
  city: string;
  country: string;
  email: string;
};

export type table_type = 'accounts_users' | 'accounts';

export type tableDataRow = AccountUserForm | AccountForm | DeviceForm | NetworkForm
export type tableData = tableDataRow[];

// import {EnumValues} from 'enum-values';
// import { keys } from 'ts-transformer-keys';

// interface Propsa {
//   id: string;
//   name: string;
//   age: number;
// }
// const keysOfProps = keys<Propsa>();
// console.log(keysOfProps); // ['id', 'name', 'age']
// const keysOfAccountUserForm2 = keys<AccountUserForm>().toString();
// export const keysOfAccountUserForm =keysOfAccountUserForm2
// export const keysOfAccountUserForm = keys<AccountUserForm>();