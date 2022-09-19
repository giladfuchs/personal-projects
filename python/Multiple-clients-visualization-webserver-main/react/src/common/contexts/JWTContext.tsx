import React, { createContext, useMemo, useReducer } from 'react';
import  { AxiosResponse } from 'axios';

import jwtDecode from 'jwt-decode';

import accountReducer, { initialState } from './accountReducer';
import { AuthRes, JWTContextType, KeyedObject, LOGIN, LOGOUT } from 'types';
import { API } from 'common/hooks/useApi';



export const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    try {
        const decoded: KeyedObject = jwtDecode(serviceToken);

        return decoded.exp > Date.now() / 1000;
    } catch (error) {
        return false
    }

};

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const dispatch_login = (token: string,username:string) => {
        dispatch({
            type: LOGIN,
            payload: {
                token,
                username
            }
        });
    };

    const logout = () => {
        localStorage.clear();
        dispatch({
            type: LOGOUT
        });
    };
    const login = async (username: string, password: string) => {
        const response:AxiosResponse<AuthRes> = await API.post(`auth/login`, { username, password });
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        dispatch_login(token, response.data.username);
    };

    useMemo(async () => {
        const token = localStorage.getItem('token');

        if (token && verifyToken(token)) {
            try {
                const response:AxiosResponse<AuthRes>  = await API.get(`auth/token`);
                if (response.status === 200) dispatch_login(token, response.data.username);
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
