package com.react.todo.service;

import org.springframework.stereotype.Service;
import com.react.todo.model.ToDo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ToDoService {

    private static List<ToDo> list=new ArrayList<>();

    private static long i=0;

    static{
        list.add(new ToDo(++i,"vikrant","vikrant Intelligent",new Date(),false));
        list.add(new ToDo(++i,"amit","amit Intelligent",new Date(),false));
        list.add(new ToDo(++i,"vipin","vipin Intelligent",new Date(),false));
        list.add(new ToDo(++i,"rahul","rahul Intelligent",new Date(),false));
    }

    public List<ToDo> getToDoList(){
        return list;
    }

    public ToDo updateToDo(long id, ToDo toDo) {
//        ToDo toDo=new ToDo(++i,"rahul","rahul Intelligent",new Date(),false);
        if(null == findById(id)){
            list.add(toDo);
        }else{
            deleteToDo(id);
            list.add(toDo);
        }
        return toDo;
    }

    public ToDo deleteToDo(long id){
        ToDo todo=findById(id);
        if(todo!=null){
            list.remove(todo);
            return todo;
        }
        return null;
    }

    public ToDo findById(long id) {
        for(ToDo todo:list){
            if(id==todo.getId()){
                return todo;
            }
        }
        return null;
    }

    public ToDo createToDo(ToDo todo) {
        ToDo toDo=new ToDo(++i,todo.getUsername(),todo.getDescription(),new Date(),todo.isDone());
        list.add(toDo);
        return toDo;
    }
}
