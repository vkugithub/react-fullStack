package com.react.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.react.todo.model.ToDo;
import com.react.todo.service.ToDoService;

@CrossOrigin
@RestController
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping(value="/users/{name}/todos")
    public List<ToDo> getToDos(@PathVariable("name") String name){
        return toDoService.getToDoList();
    }

    @GetMapping (value="/users/{name}/todos/{id}")
    public ResponseEntity<?> getToDo(@PathVariable("name") String name, @PathVariable("id") long id){
        ToDo toDo= toDoService.findById(id);
        if(toDo==null){
            return new ResponseEntity<>(
                    "ToDo is not found for id : "+id,
                    HttpStatus.OK);
        }
        return ResponseEntity.ok(toDo);
    }

//    @RequestMapping(method = RequestMethod.POST, value = "/users/{name}/todos/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PutMapping(value="/users/{name}/todos/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ToDo> updateToDo(@PathVariable("name") String name, @PathVariable("id") long id, @RequestBody ToDo todo){
        ToDo toDo= toDoService.updateToDo(id,todo);

        return new ResponseEntity<ToDo>(toDo, HttpStatus.OK);
    }

    @PostMapping(value="/users/{name}/todo", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo todo){
        ToDo toDo= toDoService.createToDo(todo);

        return new ResponseEntity<ToDo>(toDo, HttpStatus.OK);
    }


    @DeleteMapping (value="/users/{name}/todos/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable("name") String name, @PathVariable("id") long id){
        if(null != toDoService.deleteToDo(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
