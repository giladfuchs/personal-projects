import React, { createContext,  useMemo, useReducer } from 'react';

import jwtDecode from 'jwt-decode';

import accountReducer from './accountReducer';
import { LOGIN } from './type_actions';
import axios from 'axios';

type JWTContextType = {
    isLoggedIn: boolean;
    token?: string;

    // logout: () => void;
    login: (username: string, password: string) => Promise<void>;
 
};
type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};
 

export type initialLoginContextProps = {
    isLoggedIn: boolean;
    token?: string;
}
const initialState: initialLoginContextProps = {
    isLoggedIn: false,
};

export const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }

    const decoded: KeyedObject = jwtDecode(serviceToken);
 
    return decoded.exp > Date.now() / 1000;
};

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);


    const login = async (username: string, password: string) => {
        const response= await axios.post(`http://0.0.0.0:60000/api/auth/login`,  { username, password });
            

                     dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        token:response.data.access_token
                    }
                });
        // try {
        //     const login_form: LoginForm = { username: email, password };
        //     // const [response, data] = await objApi.post(`/api2/${NavigationEnum.LOGIN}`, login_form, dispatch_cart);
        //     const [response, data] = await objApi.post(`/${NavigationEnum.LOGIN}`, login_form, dispatch_cart);

        //     if (response && data !== undefined && !data.error) {
        //         localStorage.setItem('token', data['access_token']);
        //         localStorage.setItem('user_id', data['user_id']);
        //         localStorage.setItem('user_account_id', data['user_account_id']);
        //         localStorage.setItem('user_account_name', data['user_account_name']);
        //         localStorage.setItem('user_account_type', data['user_account_type']);
        //         await get_context_user2(data['user_account_id'])

        //         dispatch({
        //             type: LOGIN,
        //             payload: {
        //                 isLoggedIn: true
        //             }
        //         });
        //     } else {
        //         logout();
        //     }
        // } catch (err: any) {
        //     console.log(err);
        // }
    };

  
    useMemo(() => {
                const token = localStorage.getItem('token');
                    console.log(token);
                    
                // if (token && verifyToken(token)) {
                    // dispatch({
                    //     type: LOGIN,
                    //     payload: {
                    //         isLoggedIn: true
                    //     }
                    // });
        // const cartItemsData = localStorage.getItem('permissions')
        // if (cartItemsData){
        //     const permissions= JSON.parse(cartItemsData)
        //             dispatch({
        //                 type: SET_PERMISSIONS,
        //                 payload: {
        //                     isLoggedIn: true,
        //                     permissions
        //                 }
        //             });}
                    
   

    }, []);

    return <JWTContext.Provider value={{ ...state, login }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
