export interface AccountReducerActionProps {
    type: string;
    payload?: {token:string, username:string};
}


export type JWTContextType = {
    isLoggedIn: boolean;
    token?: string;
    username?:string;
    logout: () => void;
    login: (username: string, password: string) => Promise<void>;
};



export type initialLoginContextProps = {
    isLoggedIn: boolean;
    token?: string;
    username?: string;
};
 

export type TokenResponse = {
    access_token: string;
    username: string;
};
 

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
