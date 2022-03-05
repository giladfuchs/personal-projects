import { dataState } from "./data.types";

export const initialDataState: dataState = {
  business: {
    details: {
      organization: "",
      address: "",
      phone: "",
    },
    otherData: {
      logo: "",
      links: {},
      about: "",
      notifications: [""],

      guestPermission: false,
    },
  },
  employee: { details: { firstName: "", lastName: "", phone: "" } },
  schedule: { sunday: [] },
  services: [],
  mat: [],
  days: [],
  durationOfNewQueue: 0,
  startMinTime: "09:00",
  timeDistance: 10,
  price: 0,
};
