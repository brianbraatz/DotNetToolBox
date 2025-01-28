import * as React from 'react';
import {KeyboardEvent, useState} from 'react';

export const AddTodo: React.FC<IAddTodoProps> = ({onAdd}) => {
    const [todo, setTodo] = useState('');
    const mayAdd = todo && todo.length;

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && mayAdd) {
            add();
        }
    };

    const add = () => {
        onAdd(todo);
        setTodo('');
    };

    return (
        <label>
            Enter new todo:<br/>
            <input type="text" className="todo-input" value={todo} onChange={e => setTodo(e.target.value)} onKeyPress={onKeyPress}/>
            <button className="add-todo" onClick={add} disabled={!mayAdd}>Add</button>
        </label>
    );
};

export interface IAddTodoProps {
    onAdd(todo: string): void
}