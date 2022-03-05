import { Queue, Person, BusinessDetails, Service, Day } from "../../../models";

export interface dataState {
  business: BusinessDetails;
  services: Service[];
  employee: Person;
  schedule: { sunday: Day[] } | any;
  mat: boolean[][];
  days: string[];
  durationOfNewQueue: number;
  startMinTime: string;
  timeDistance: number;
  price: number;
}

export enum dataActionsEnum {
  SUCCESS_GET_ALL_DATA = "SUCCESS_GET_ALL_DATA",

  SUCCESS_POST_BUSINESS_DETAILS = "SUCCESS_POST_BUSINESS_DETAILS",
  SUCCESS_POST_EMPLOYEE_SCHEDULE = "SUCCESS_POST_EMPLOYEE_SCHEDULE",

  SUCCESS_POST_SERVICE = "SUCCESS_POST_SERVICE",
  SUCCESS_UPDATE_SERVICE = "SUCCESS_UPDATE_SERVICE",
  SUCCESS_DELETE_SERVICE = "SUCCESS_DELETE_SERVICE",

  SUCCESS_SET_CALENDAR = "SUCCESS_SET_CALENDAR",

  UPDATE_MATRIX = "UPDATE_MATRIX",
}

export interface dataActionPattern {
  type: dataActionsEnum;
}
export interface updateMatrixScheduleActionType extends dataActionPattern {
  type: dataActionsEnum.UPDATE_MATRIX;
  queue: Queue;
}

export interface successSetCalendarActionType extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_SET_CALENDAR;
  mat: boolean[][];
  days: string[];
  durationOfNewQueue: number;
  timeDistance: number;
  startMinTime: string;
  price: number;
}

export interface successGetAllDataActionType extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_GET_ALL_DATA;
  business: BusinessDetails;
  services: Service[];
  employee: Person;
  schedule: { day: Day[] } | any;
  mat?: boolean[][];
  days?: [];
}

export interface successPostEmployeeScheduleActionType
  extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_POST_EMPLOYEE_SCHEDULE;
  schedule: Day;
}

export interface successPostBusinessDetailsActionType
  extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_POST_BUSINESS_DETAILS;
  business: BusinessDetails;
}

//service
export interface successPostServicesActionType extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_POST_SERVICE;
  service: Service;
}

export interface successUpdateServiceActionType extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_UPDATE_SERVICE;
  service: Service;
}

export interface successDeleteServiceActionType extends dataActionPattern {
  type: dataActionsEnum.SUCCESS_DELETE_SERVICE;
  serviceId: string;
}
