import React, { useState, createContext, useEffect } from 'react';
import { getUserAccount } from '../services/userService';


const UserContext = createContext(null);

function UserProvider({children}) {

    const [user, setUser] = useState(
        {
            isAuthenticated: false,
            token: false, 
            account: {}
        }
    );

    const loginContext = (userData) => {
        setUser(userData);
    }

    const logoutContext = (name) => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    }

    const fetchUser = async() => {
        if(window.location.pathname !== '/'){
            let data = await getUserAccount();
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, loginContext, logoutContext}}>
            {children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider};