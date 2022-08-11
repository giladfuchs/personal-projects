// action - state management
import { LOGIN, LOGOUT } from './type_actions';
import { initialLoginContextProps } from './JWTContext';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState: initialLoginContextProps = {
    isLoggedIn: false,

};

export interface AccountReducerActionProps {
    type: string;
    payload?: initialLoginContextProps;
}

const accountReducer = (state = initialState, action: AccountReducerActionProps) => {
    switch (action.type) {
  
        case LOGIN: {
            console.log(action);
            
            return {
                ...state,
                isLoggedIn: true,
                token:action.payload!.token
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,

            };
        }
 
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
