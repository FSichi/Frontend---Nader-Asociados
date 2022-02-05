import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import { AuthRoutes } from './AuthRoutes'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { NaderRoutesApp } from '../NaderRoutesApp';

import firebase from 'firebase/compat/app';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

export const MainRoutes = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    
    useEffect(() => {

        firebase.auth().onAuthStateChanged( async (user) => {
            
            if(user?.uid){
                dispatch( login(user.uid, user.displayName, user.email) );
                setIsLoggedIn( true );
            }else{
                setIsLoggedIn( false );
            }

            setChecking(false);
        });

    }, [ dispatch, setChecking, setIsLoggedIn]);

    if( checking ){
        return (
            <h1 className='text-white text-center mt-5'>Espere un Segundo...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={AuthRoutes} isAuthenticated={isLoggedIn}/>
                    <PrivateRoute exact path="/" component={NaderRoutesApp} isAuthenticated={isLoggedIn}/>

                    <Redirect to={'/auth/login'} />

                </Switch>
            </div>
        </Router>
    )
}
