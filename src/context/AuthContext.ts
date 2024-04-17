import {createContext} from "react";

interface AuthInterface {
    isLoggedIn: boolean;
    setLogin: (status: boolean, accessToken?: string, refreshToken?: string)=>void;
    userId?: string | number;
    token?: string;
    role?: string;
}

export const AuthContext = createContext<AuthInterface>({
    isLoggedIn: false, setLogin: ()=>{}
})