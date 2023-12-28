import { AccountUserForm, AccountForm, DeviceForm , NetworkForm} from "..";

export const defaultAccountUserForm: AccountUserForm = {
    role: 'Account Viewer',
    name: '',
    username: '',
    password: '',
    phone: '',
    email: '',
  }

export const defaultDeviceForm: DeviceForm = {
  apply_action: "discard",
  moderated: 'moderated',
  name: "",
  vendor: "cisco"
}

export const defaultNetworkForm: NetworkForm = {
  "holistic": true,
  "ip": "",
  "mask": 24,
  "rate_limit": false,
}

  export const defaultAccountForm: AccountForm = {
    "account_bandwidth_mbps": 1,
    "link_capacity_unit": 'MB',
    "asns": [
        
    ],
    "blackhole": false,
    "blackhole_threshold": 1,
    "id": "",
    "name": "",
    "rate_limit": true,
    "type": "customer",
    "address": "",
    "phone": 52,
    "state": "",
    "website": "",
    "zip": "",
    "city": "",
    "country": "",
    "email": "",

  }
  