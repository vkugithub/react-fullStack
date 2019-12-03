// import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from '../components/todo/AuthenticationService.js'
import axios from 'axios'

const todoActions = {
    updateToDos: function(state , action1){
        console.log('updateToDos ', state.todos, action1)
          const todos2=state.todos.filter((todo)=>{
            return !(parseInt(todo.id) === parseInt(action1.index))
            })
            const todos3 = [...todos2, ...action1.todos]
            const testtodos = {todos:todos3}
            return testtodos;
      },
    createToDo: function(){
        console.log('createToDo')
    },

    loadToDos: function(){
        console.log('loadToDos')
        let username = AuthenticationService.getLoggedInUserName()
        console.log('username ',username)
        axios.get(`http://localhost:8080/users/vik/todos`)
          .then(
              response => {
                  console.log('refreshTodos',response);
                  return {todos : response.data}
              }
          ).catch((error)=>{
            console.log(error);
            return {todos : []}
          })
    }
}

export default todoActions