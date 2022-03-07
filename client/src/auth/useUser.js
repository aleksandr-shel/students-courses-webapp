import { useEffect, useState } from 'react';
import { useLoggedInContext } from '../Context/LoggedInContext';
import { useToken } from './useToken';


export const useUser = ()=>{
    const [token] = useToken();

    const loggedInContext = useLoggedInContext();

    const getPayloadFromToken = token =>{
        const encodedPayload = token.split('.')[1];
        return JSON.parse(atob(encodedPayload, 'base64'));
    }

    const [user, setUser] = useState(()=>{
        if(!token) return null;
        return getPayloadFromToken(token);
    });

    useEffect(()=>{
        if(!token){
            setUser(null);
            loggedInContext.setLoggedIn(false);
        }else {
            setUser(getPayloadFromToken(token));
            loggedInContext.setLoggedIn(true);
        }
    }, [token])

    return user;
}