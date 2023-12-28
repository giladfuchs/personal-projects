import {  objApi } from "../../services/api";
import { tableDataRow} from "../../common/types/models";
import { GeneralActionsEnum } from "../../common/types/redux";
import { NavigationEnum, TableEnum } from "..";


export const delete_form = (url_path:NavigationEnum, account_user_id: string) => {
  return async (dispatch: any) => {
      dispatch({ type: GeneralActionsEnum.START_API });
      // const account_id = localStorage.getItem("id");
      const account_id = url_path !== NavigationEnum.ACCOUNTS_TABLE ? `/${localStorage.getItem("id")}` :'' ;

      const [success, data]= await objApi.delete(`${url_path}${account_id}/${account_user_id}`);
      if( success)  {   
      dispatch({
        type: GeneralActionsEnum.DELETE_TABLE,
         account_user_id: account_user_id, 
         reducer_obj:TableEnum.ACCOUNTS

      })
    }
      else{dispatch({
        type: GeneralActionsEnum.FALID_API,
        error:data

      });

    return 

    }
  };
};

export const send_form = (url_path:NavigationEnum, accountForm: tableDataRow) => {
  return async (dispatch: any) => {
    const account_id = url_path !== NavigationEnum.ACCOUNTS_TABLE ? `/${localStorage.getItem("id")}` :'' ;
      
      dispatch({ type: GeneralActionsEnum.START_API });
      const [success, data] = await objApi.put(`${url_path}${account_id}`, accountForm);


      if( success)  {   
      const new_account = data
      
        dispatch({
          type: GeneralActionsEnum.ADD_TABLE,
          new_account:new_account, 
          reducer_obj:TableEnum.ACCOUNTS
        });
      }
        else{dispatch({
          type: GeneralActionsEnum.FALID_API,
          error: data
  
        });
  
      return 
  
      }
  };
};

export const update_form = (url_path:NavigationEnum, accountForm: tableDataRow, account_user_id: string) => {
  return async (dispatch: any) => {
      
      dispatch({ type: GeneralActionsEnum.START_API });
      const account_id = url_path !== NavigationEnum.ACCOUNTS_TABLE ? `/${localStorage.getItem("id")}` :'' ;

      const [success, data] = await objApi.post(`${url_path}${account_id}/${account_user_id}`, accountForm);


      if( success)  {   
      const update_account = data
      
        dispatch({
          type: GeneralActionsEnum.UPDATE_TABLE,
         account_user_id: account_user_id, 
         update_account:update_account, 
          reducer_obj:TableEnum.ACCOUNTS
        });
        dispatch({
          type: GeneralActionsEnum.API_FALSE,
  
        })
      }
        else{dispatch({
          type: GeneralActionsEnum.FALID_API,
          error: data
  
        });
  
      return 
  
      }
  };
};
