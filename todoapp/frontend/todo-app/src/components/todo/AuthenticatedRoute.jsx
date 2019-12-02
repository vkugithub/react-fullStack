import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }
  
//   const PropsRoute = ({ component, ...rest }) => {
//     return (
//       <Route {...rest} render={routeProps => {

//           console.log('PropsRoute ', {...rest} );
//         return renderMergedProps(component, routeProps, rest);
//       }}/>
//     );
//   }
  
// class AuthenticatedRoute extends Component {   
    
//     render() {
//         console.log('AuthenticatedRoute',this.props)
//         const reactcomponent=this.props.component
//        // this.props.component=''
//         if(AuthenticationService.isUserLoggedIn()) {
//             return <PropsRoute component={reactcomponent} {...this.props} />
//         } else {
//             return <Redirect to="/login"/>
//         }

//     }
// }

class AuthenticatedRoute extends Component {    
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} render={routeProps => {
                        return renderMergedProps(this.props.component, routeProps);}}/>
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute