// action - state management
import { LOGIN, LOGOUT } from 'types';
import { AccountReducerActionProps, initialLoginContextProps } from 'types';

// ==============================|| ACCOUNT REDUCER ||============================== //

export const initialState: initialLoginContextProps = {
    isLoggedIn: false,
    username:''

};



const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
  
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                token:action.payload!.token,
                username:action.payload!.username
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                token:'',
                username:''
            };
        }
 
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
