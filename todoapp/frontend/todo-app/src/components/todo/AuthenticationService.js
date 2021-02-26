import axios from 'axios'

class AuthenticationService {

    async retrieveAllTodos(token) {
        console.log(' retrieveAllTodos service executed', token)
        const AuthStr = 'Bearer '.concat(token);
        return await axios.get('http://localhost:8080/users/vvv/todos',
        // ,{
        //     headers: {
        //       'Authorization': 'Bearer '
        //     }
        //    }
           );
    }

    executeBasicAuthenticationService(username, password) {
console.log('http://localhost:8080/authenticate')
        return axios.post('http://localhost:8080/authenticate'
        // ,{headers: {authorization: this.createBasicAuthToken(username,password)}}
            )
    }

    executeJwtAuthenticationService(username, password) {
        console.log('executeJwtAuthenticationService', username, password)
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        })
    }

    createBasicAuthToken(username,password) {
        return 'Basic ' +  window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username,password){
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginForJwt(username,token) {
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' +  token
    }


    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return ''
        return user
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()