import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class AuthenticatedRoute extends Component {    
    render() {
        console.log('AuthenticatedRoute')
        // console.log(...this.props.todos)
        if(AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute