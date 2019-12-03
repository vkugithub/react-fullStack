import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
// import history from '../../history.js';
import { withRouter } from "react-router-dom";

const loadDataAsycn = async (props) => {  
    props.loadtodos()
    return true;  
  }; 

class ListTodosComponent extends Component {

    constructor(props){
        console.log('ListToDosComponent constructor')
        super(props)
        console.log(props)
        this.state = {
            todos :  props.todos,
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('ListToDosComponent componentDidMount')
        // this.refreshTodos();
        loadDataAsycn(this.props).then(() => {  
            this.props.history.push('/todos')
          }).catch((error) => {  
            console.log('error ',error)
          });
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        console.log('username ',username)
        TodoDataService.retrieveAllTodos(username)
          .then(
              response => {
                  console.log('refreshTodos',response);
                  this.setState({todos : response.data})
              }
          )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
         .then (
             response => {
                this.setState({message : `Delete of todo ${id} Successful`})
                this.refreshTodos()
             }
         )

    }

    addTodoClicked() {
        this.props.history.push(`/todo/-1`)
    }

    updateTodoClicked(id) {
        console.log('updateTodoClicked ', id , this.props.component)

        this.props.history.push(`/todo/${id}`)
        
        // /todos/${id}
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        //  .then (
        //      response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //      }
        //  )

    }

    render() {
        console.log('render to ListTodosComponent')
        return (
            <div>
                 <h1>List Todos</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                 </div>
            </div>
        )
    }
}

export default withRouter(ListTodosComponent)