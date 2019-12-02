import React, {Component} from 'react'
import {BrowserRouter as Router, Route,Redirect, Switch} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
import history from '../../history.js';

class TodoApp extends Component {

    constructor(props) {
        super(props)
        console.log('ToDoApp');
        console.log(props)
    }
    componentDidMount() {
        console.log('ToDoApp');
        console.log(this.props)
    }

    componentWillUnmount() {
        console.log('ToDoApp');
        console.log(this.props)
    }

    render() {
        return (
            <div className="TodoApp">
                <Router history={history}>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute exact path="/todos"  component={ListTodosComponent}  {...this.props} />
                             <AuthenticatedRoute exact path="/todo/:id"  component={TodoComponent} {...this.props}/>
                             {/*<Route exact path="/todo/:id" render={(params)=>{
                                if(AuthenticationService.isUserLoggedIn()) {
                                    return <TodoComponent  {...this.props} />
                                } else {
                                    return <Redirect to="/login"/>
                                } 
                            }}></Route>*/}
                            
                            {/* <Route exact path="/todos" render={(params)=>{
                                if(AuthenticationService.isUserLoggedIn()) {
                                    return <ListTodosComponent  {...this.props} />
                                } else {
                                    return <Redirect to="/login"/>
                                } 
                            }}></Route> */}
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}

export default TodoApp