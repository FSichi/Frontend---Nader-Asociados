import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { LoginScreen } from '../components/Auth/LoginScreen'
import { RegisterScreen } from '../components/Auth/RegisterScreen'


export const AuthRoutes = () => {
    return (
        <div>
            <div >
                <Switch>
                    <Route exact path='/auth/login' component={LoginScreen}/>
                    <Route exact path='/auth/register' component={RegisterScreen}/>
                    
                    <Redirect to='/auth/login' />
                </Switch>
            </div>  
        </div>
    )
}
