export interface GeneralState {
  error: string;
  loading: boolean;
  isLogin: boolean;
  isAdmin: boolean;
  isTokenSet: boolean;
  step: number;
}

export enum GeneralActionsEnum {
  START_BUSINESS_DETAILS = "START_BUSINESS_DETAILS",
  START_SERVICE = "START_SERVICE",
  START_AUTH = "START_AUTH",
  START_QUEUE = "START_QUEUE",
  SUCCESS_AUTH = "SUCCESS_AUTH",
  SUCCESS_DATA = "SUCCESS_DATA",
  SUCCESS_SERVICE = "SUCCESS_SERVICE",
  SUCCESS_QUEUE = "SUCCESS_QUEUE",
  FALID_AUTH = "FALID_AUTH",
  FALID_BUSINESS_DETAILS = "FALID_BUSINESS_DETAILS",
  FALID_SERVICE = "FALID_SERVICE",
  FALID_QUEUE = "FALID_QUEUE",
  DECREMENT = "DECREMENT",
  INCREMENT = "INCREMENT",
  LOGOUT = "LOGOUT",
  SUCCESS_SET_TOKEN = "SUCCESS_SET_TOKEN",

  SUCCESS_EMPLOYEE_LOGIN_AUTH = "SUCCESS_EMPLOYEE_LOGIN_AUTH",
  SUCCESS_CLIENT_LOGIN_AUTH = "SUCCESS_CLIENT_LOGIN_AUTH",
  SUCCESS_SEND_TOKEN_MSG = "SUCCESS_SEND_TOKEN_MSG",
  SUCCESS_SET_NEW_PASSWORD = "SUCCESS_SET_NEW_PASSWORD",
  FAILD_CALENDAR = "FAILD_CALENDAR",
}

interface GeneralActionPattern {
  type: GeneralActionsEnum;
}

//start
export interface startServiceActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.START_SERVICE;
}
export interface startAuthActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.START_AUTH;
}
export interface startDetailsActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.START_BUSINESS_DETAILS;
}
export interface startQueueActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.START_QUEUE;
}

//success
export interface successServiceActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_SERVICE;
}
export interface successAuthctionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_AUTH;
}
export interface successDataActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_DATA;
}
export interface successQueueActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_QUEUE;
}

//faild
interface error extends GeneralActionPattern {
  error: string;
}
export interface faildAuthActionType extends error {
  type: GeneralActionsEnum.FALID_AUTH;
}
export interface faildServiceActionType extends error {
  type: GeneralActionsEnum.FALID_SERVICE;
}
export interface faildDetailsActionType extends error {
  type: GeneralActionsEnum.FALID_BUSINESS_DETAILS;
}
export interface faildQueueActionType extends error {
  type: GeneralActionsEnum.FALID_QUEUE;
}

//increment decrement
export interface INCREMENT extends GeneralActionPattern {
  type: GeneralActionsEnum.INCREMENT;
}
export interface DECREMENT extends GeneralActionPattern {
  type: GeneralActionsEnum.DECREMENT;
}

//other login logout

export interface logoutActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.LOGOUT;
}

export interface successEmployeeLoginAuthActionType
  extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_EMPLOYEE_LOGIN_AUTH;
}
export interface successClientLoginAuthActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_CLIENT_LOGIN_AUTH;
}

export interface successSetTokenActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_SET_TOKEN;
}

export interface successSendTokenMsgActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_SEND_TOKEN_MSG;
}

export interface successSetNewPasswordActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_SET_NEW_PASSWORD;
}
