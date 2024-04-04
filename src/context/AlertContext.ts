import {createContext, useContext} from "react";

interface AlertContextInterface{
    success: (title: string, msg: string)=>void;
    error: (title: string, msg: string)=>void;
    warning: (title: string, msg: string)=>void;
    info: (title: string, msg: string)=>void;
}

export const AlertContext = createContext<AlertContextInterface>({success: ()=>{} , info: ()=>{} , error: ()=>{}, warning: ()=>{}});