import { createContext, useContext } from "react";

export const LoggedInContext = createContext();

export function useLoggedInContext(){
    return useContext(LoggedInContext);
}