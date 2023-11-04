import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';


function PrivateRoutes(props) {

    let history = useHistory();

    useEffect(() => {
        
        let session = sessionStorage.getItem('account');
        if(!session) {
            history.push('/login');
        }

    }, [])

    return (
        <>
            <Route path={props.path}>{props.component}</Route>
        </>
    );
}

export default PrivateRoutes;