export function loadtodos(todos) {
    return {
        type: 'LOAD_TODO',
        todos
    }
}
export function addtodo(todo) {
    return {
        type: 'ADD_TODO',
        todo
    }
}
export function removetodo(index) {
    return {
        type: 'REMOVE_TODO',
        index
    }
}
export function updatetodo(todo) {
    console.log ('updatetodo')
    
    let todos=[todo]
    console.log (todos)
    return {
        type: 'REMOVE_TODO',
        todo : todos,
        index : 1
    }
}