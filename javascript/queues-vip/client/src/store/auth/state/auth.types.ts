import { Person } from "../../../models/system/persones";

export interface AuthState {
  person: Person;
  domains: [];
  isValidDomain: boolean;
}

export enum AuthActionsEnum {
  LOGIN_CHECK_FAILD = "LOGIN_CHECK_FAILD",
  SET_DOMAINS = "SET_DOMAINS",
  SET_PERSON = "SET_PERSON",

  DOMAIN_IS_VALID = "DOMAIN_IS_VALID",
}

export interface AuthActionPattern {
  type: AuthActionsEnum; //Action Type
}

export interface signInCheckActionType extends AuthActionPattern {
  type: AuthActionsEnum.LOGIN_CHECK_FAILD;
  ans: boolean;
  isAdmin: boolean;
}

export interface setDomainsActionType extends AuthActionPattern {
  type: AuthActionsEnum.SET_DOMAINS;
  domains: [];
}

export interface setPersonActionType extends AuthActionPattern {
  type: AuthActionsEnum.SET_PERSON;
  person: Person;
}

//Domain

export interface domainIsValidActionType extends AuthActionPattern {
  type: AuthActionsEnum.DOMAIN_IS_VALID;
}
