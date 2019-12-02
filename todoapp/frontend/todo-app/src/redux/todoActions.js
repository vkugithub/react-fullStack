export function updateToDos(state , action1){
    console.log('updateToDos ', state.todos, action1)
      const todos2=state.todos.filter((todo)=>{
        return !(parseInt(todo.id) === parseInt(action1.index))
        })
        const todos3 = [...todos2, ...action1.todos]
        console.log('UPDATE_TODO action1' , todos3)
        const testtodos = {todos:todos3}
        console.log('UPDATE_TODO action2' , todos3)
      //  const todos= state.todos.map(todo => {
      //     if (todo.id === action.todo.id) {
      //       return {
      //         // ...todo,
      //         id: action.todo.id,
      //         description: action.todo.description
      //       };
      //     }
      //     return todo;
      //   })
      console.log('UPDATE_TODO action 3' , testtodos)
        return testtodos;
  }