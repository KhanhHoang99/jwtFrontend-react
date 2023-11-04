import React from 'react';
import { Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/Users/Users";
import PrivateRoutes from './PrivateRoutes';

function AppRoutes(props) {



    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <Route exact path="/">Home Page</Route>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="*">
                    <p>404 not Found</p>
                </Route>
            </Switch>
        </>
    );
}

export default AppRoutes;