import axios from 'axios'

class TodoDataService {
     retrieveAllTodos() {
        console.log('executed service')
        return axios.get('http://localhost:3001/');
    }

    retrieveTodo(name, id) {
        //console.log('executed service')
        return axios.get(`http://localhost:3001/todos`);
    }

    deleteTodo(name, id) {
        //console.log('executed service')
        return axios.delete('http://localhost:3001/delete');
    }

    updateTodo(name, id, todo) {
        //console.log('executed service')
        return axios.post('http://localhost:3001/update', todo);
    }

    createTodo(name, todo) {
        //console.log('executed service')
        return axios.post('http://localhost:3001/create', todo);
    }

}

export default new TodoDataService()