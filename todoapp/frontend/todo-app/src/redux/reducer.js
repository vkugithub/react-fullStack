import _todos from '../data/todosdata'
// import {combineReducers} from 'redux'

// function comments(state={}, action) {
//     switch (action.type) {
//         case 'ADD_COMMENT':  
        
//         if (!state[action.todoId]) {
//             return {...state, [action.todoId]: [action.comment]}
//         } else {
//             return {...state, [action.todoId]: [...state[action.todoId], action.comment] }
//         }

//         case 'LOAD_COMMENTS': return action.comments
        
//         default: return state
//     }
//     return state
// }


function todos(state = _todos, action) {
    switch (action.type) {
        case 'REMOVE_TODO': return [...state.todos.slice(0, action.index), ...state.todos.slice(action.index + 1)]
        case 'ADD_TODO': return [...state, action.todo]
        case 'LOAD_TODO': return action.todos
        case 'UPDATE_TODO' :  return {
            // ...state,
            todos: state.todos.map(todo => {
              if (todo.id === action.todo.id) {
                return {
                  // ...todo,
                  id: action.todo.id,
                  description: action.todo.description
                };
              }
              return todo;
            })
          };
        //  (()=>{
        //     console.log('UPDATE_TODO')
        //     console.log(action.todo)
        //         let todoslist=state.todos.filter((todo)=>{
        //             return todo.id!==action.todo.id
        //         })
        //         state={todos : todoslist}
                
        //         return [...state, action.todo]
        //     }
        // ) 
        default: return state

    }

    
}

const rootReducer = todos

export default rootReducer