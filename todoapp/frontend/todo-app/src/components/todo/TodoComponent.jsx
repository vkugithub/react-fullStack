import React, {Component} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todos : props.todos,
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        let todos= this.state.todos
        console.log('TodoComponent 1')
        console.log(todos)
        // todos.filter((todo)=>{
        //     console.log(todo.id)
        //     return todo.id === 1
        // })
        // console.log('TodoComponent 2')
        ////console.log(todo)
        // this.setState(todos[0])
        if(this.state.id===-1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        TodoDataService.retrieveTodo(username, this.state.id)
             .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
             }))
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if(values.description.length<5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }

        console.log(values);
        //this.props.updatetodo(todo)
        //.then(()=>
        //this.props.history.push('/todos')
    }

    render() {
        
        let {id,description,targetDate} = this.state
        console.log(id)
        console.log(description)
        //let targetDate = this.state.targetDate

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                                className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div"
                                                                className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TodoComponent