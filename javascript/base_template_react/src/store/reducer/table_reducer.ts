import { _success_api } from ".";
import { array_obj_to_index_obj, filter_array_obj, updateObject } from "../../services";
import * as actions from "../../common/types/redux";


export const delete_row = (
  state: actions.GeneralState,
  action: actions.deleteUserActionType 
) => {
  const tableData =filter_array_obj([...state[action.reducer_obj]], action.account_user_id)
  return updateObject(state, {
    loading: false,
    [action.reducer_obj]: tableData,


  });
};

export const add_row = (
  state: actions.GeneralState,
  action: actions.addUserActionType 
) => {
  const tableData =[...state[action.reducer_obj]]

  tableData.push(action.new_account)
  
  return updateObject(state, {
    loading: false,
    [action.reducer_obj]: tableData,
    error:'',
    ..._success_api
  });
};

export const update_row = (
  state: actions.GeneralState,
  action: actions.updateUserActionType 
) => {

  const tableData =[...state[action.reducer_obj]]
  const index =array_obj_to_index_obj(tableData, action.account_user_id)

  tableData[index] = action.update_account
  return updateObject(state, {
    loading: false,
    [action.reducer_obj]: tableData,
    error:'',
    ..._success_api
  });
};
