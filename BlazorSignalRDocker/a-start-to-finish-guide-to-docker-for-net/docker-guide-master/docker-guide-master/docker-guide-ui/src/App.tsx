import React, {useEffect, useState} from 'react';
import './App.css';
import {AddTodo} from './components/AddTodo';
import {TodoList} from './components/TodoList';
import {ITodo, TodoService} from './services/todo.service';

export const App: React.FC<IAppProps> = ({todoService}) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    useEffect(() => {
        todoService.getAll().then(x => {
            console.log(x);
            setTodos(x);});
    }, [todoService]);

    const addTodo = (todo: string) => {
        const newTodo = {id: 0, name: todo};
        setTodos([...todos, newTodo]);
        todoService.add(todo).then(x => newTodo.id = x.id);
    };

    const markComplete = (todo: ITodo) => {
        setTodos(todos.filter(x => x.id !== todo.id));
        todoService.remove(todo);
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Todo list</h1>
                <AddTodo onAdd={addTodo} />
                <TodoList todos={todos} onMarkComplete={markComplete}/>
            </div>
        </div>
    );
};

export interface IAppProps {
    todoService: TodoService;
}