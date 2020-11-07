import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {useAuth} from '../auth.js';

export default function ProtectedRoute({ component:Component, ...rest }){
    
    const { authTokens, setAuthTokens } = useAuth();
    return(
        <Route
            {...rest}
            render={routerProps=>{
                if(authTokens && authTokens.token){
                    return <Component {...routerProps}/>;
                }
                return <Redirect to='/login-page'/>
            }}
        />
    );
}