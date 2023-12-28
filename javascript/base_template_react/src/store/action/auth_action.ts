import { objApi } from "../../services/api";
import { LoginForm } from "../../common/types/models";
import { GeneralActionsEnum } from "../../common/types/redux";
import { NavigationEnum } from "..";

// export const setData = (token: string, personalDetails: personalDetails) => {
export const loginCheck = () => {
  return async (dispatch: any) => {
    try {
      const token = localStorage.getItem("token");
      const account_id = localStorage.getItem("id");
      if (token) {
          dispatch({ type: GeneralActionsEnum.START_AUTH });
          const [success, data] = await objApi.get(`${NavigationEnum.ACCOUNT_USERS_TABLE}/${account_id}`);
          const [success2, accounts] = await objApi.get(`${NavigationEnum.ACCOUNTS_TABLE}`);
          const [success3, devices] = await objApi.get(`${NavigationEnum.DEVICES_TABLE}/${account_id}`);
          const [success4, networks] = await objApi.get(`${NavigationEnum.NETWORKS_TABLE}/${account_id}`);
          if( success && success2)  {   

              
        dispatch({
          type: GeneralActionsEnum.SUCCESS_API,
          accounts_users: data,
          accounts: accounts,
          devices: devices,
          networks: networks,
        });}
        else{
          dispatch({
            type: GeneralActionsEnum.FALID_API,
            error:data
          });
        }
      }
      return;
    } catch (error) {
      console.error(error);
    }

  };
};

export const login = (loginForm: LoginForm) => {
  return async (dispatch: any) => {
    try {
      

      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const [success, data] =await objApi.post("auth", loginForm)
      
      if (success){
      const token = data['access_token'];
      const id = data['id'];
      
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);


       dispatch({
         type: GeneralActionsEnum.SUCCESS_AUTH,
       });
      }
      else{
        dispatch({
          type: GeneralActionsEnum.FALID_AUTH,
          error:data
        });
      }

    } catch (error) {
      console.error(error);
      
    }
      return;

  };
};

export const logout = () => {
  return async (dispatch: any) => {
      

      dispatch({ type: GeneralActionsEnum.START_AUTH });
     
      localStorage.removeItem("token");
      localStorage.removeItem("id");


       dispatch({
         type: GeneralActionsEnum.SUCCESS_LOGOUT,
       });
     


      return;

  };
};
export const move_page = () => {
  return async (dispatch: any) => {
      return   dispatch({
        type: GeneralActionsEnum.API_FALSE,

      })

  };
};
