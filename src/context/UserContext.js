import React, { useState, createContext, useEffect } from 'react';
import { getUserAccount } from '../services/userService';


const UserContext = createContext(null);

function UserProvider({children}) {

    const userDefault = {
        isAuthenticated: false,
        token: false,
        isLoading: true,
        account: {}
    }

    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({...userData, isLoading: false});
    }

    const logoutContext = (name) => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    }

    const fetchUser = async() => {
         
        if(window.location.pathname !== '/' || window.location.pathname !== '/login') {

            let response = await getUserAccount();

            if(response && response.errorCode === 0) {
                let groupWithRoles = response.data.groupWithRoles;
                let email = response.data.email;
                let username = response.data.username;
                let token = response.data.access_token;

                let data = {
                    isAuthenticated: true,
                    token, 
                    account: { groupWithRoles, email, username },
                    isLoading: false
                }

                setUser(data);

            }else {
                setUser({
                    ...userDefault,
                    isLoading: false
                })
            }
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