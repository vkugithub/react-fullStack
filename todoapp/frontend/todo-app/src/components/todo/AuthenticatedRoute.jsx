import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }
  
  const PropsRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} render={routeProps => {
          console.log('PropsRoute ', {...rest} );
        return renderMergedProps(component, routeProps, rest);
      }}/>
    );
  }


// class AuthenticatedRoute extends Component {    
//     render() {
//         if(AuthenticationService.isUserLoggedIn()) {
//             // return (
//             //     <Route {...this.props} render={routeProps => {
//             //       return renderMergedProps(this.props.component, routeProps, this.props);
//             //     }}/>
//             // )
//             <PropsRoute component={this.props.component} {...this.props} />
//             // return <Route {...this.props} render={routeProps => {
//             //             return renderMergedProps(this.props.component, routeProps, this.props);}}/>  //Routing working but props todo is not working
//         } else {
//             return <Redirect to="/login"/>
//         }

//     }
// }

  
class AuthenticatedRoute extends Component {   
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            console.log('AuthenticatedRoute', this.props)
            
            return <PropsRoute {...this.props}  />
            // const finalProps = Object.assign({}, ...this.props);
            // return React.createElement(this.props.component, finalProps )
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute