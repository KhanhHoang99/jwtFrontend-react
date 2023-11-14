import React, { useState, createContext, useEffect } from 'react';
import { getUserAccount, logoutUser } from '../services/userService';
import { toast } from 'react-toastify';
import { useHistory  } from 'react-router-dom';

const UserContext = createContext(null);

function UserProvider({children}) {

    const history = useHistory();

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

    const logoutContext = async () => {

        let data =  await logoutUser();
        if(data && +data.errorCode === 0){
            setUser(() => ({...userDefault, isLoading: false}));
            sessionStorage.clear();    
            toast.success('logout success');
            history.push('/login');
        }else{
            toast.error(data.message);
        }
    }

    const fetchUser = async() => {
         
        if(window.location.pathname !== '/' && window.location.pathname !== '/login') {

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
        }else {
            setUser(() => ({...user, isLoading: false}));
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