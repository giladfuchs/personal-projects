import { AccountUserForm, tableData , AccountForm} from "./models";

export interface GeneralState {
  error: string;
  loading: boolean;
  isTokenSet: boolean;
  success_api: boolean;
  accounts_users: tableData;
  accounts: tableData;
  devices: tableData;
  networks: tableData;
}

export enum TableEnum {
  ACCOUNTS_USERS = 'accounts_users',
  ACCOUNTS = 'accounts',
  DEVICES = 'devices',
  NETWORKS = 'networks'
}
export enum GeneralActionsEnum {
  START_API = "START_API",
  START_AUTH = "START_AUTH",
  SUCCESS_API = "SUCCESS_API",
  SUCCESS_AUTH = "SUCCESS_AUTH",
  FALID_API = "FALID_API",
  FALID_AUTH = "FALID_AUTH",
  API_FALSE = "API_FALSE",

  SUCCESS_LOGOUT = "SUCCESS_LOGOUT",

  ADD_TABLE = "ADD_TABLE",
  DELETE_TABLE = "DELETE_TABLE",
  UPDATE_TABLE = "UPDATE_TABLE",
}

interface GeneralActionPattern {
  type: GeneralActionsEnum;
}

export interface logoutActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_LOGOUT;
}

export interface falseApiActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.API_FALSE;
}
export interface addUserActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.ADD_TABLE;
  new_account: AccountUserForm | AccountForm;
  reducer_obj:TableEnum;
}

export interface deleteUserActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.DELETE_TABLE;
  account_user_id: string;
  reducer_obj:TableEnum;

}

export interface updateUserActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.UPDATE_TABLE;
  update_account: AccountForm | AccountUserForm;
  reducer_obj:TableEnum;
  account_user_id: string;


}

//start
export interface startApiActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.START_API;
}
export interface startAuthActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.START_AUTH;
}

//success

export interface successAuthctionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_AUTH;

}

export interface successApiActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.SUCCESS_API;
  accounts_users:tableData;
accounts:tableData;
devices:tableData;
networks:tableData

}
//faild
export interface faildAuthActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.FALID_AUTH;
  error:string

}
export interface faildApiActionType extends GeneralActionPattern {
  type: GeneralActionsEnum.FALID_API;
  error:string
}
