import { Day } from "./day";
export interface Person {
  _id?: string;
  details: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  };
}

export interface Employee extends Person {
  otherData: {
    password?: string;
    isAdmin: boolean;
    domain: string;
    isWorking: string;
  };
  schedule?: { BusinesHours: Day };
}

export interface Client extends Person {
  otherData?: {
    image: string;
    remark: string;
  };
}
