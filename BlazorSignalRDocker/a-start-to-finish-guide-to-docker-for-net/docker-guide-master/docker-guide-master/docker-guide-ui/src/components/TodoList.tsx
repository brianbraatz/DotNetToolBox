import * as React from 'react';
import {ITodo} from '../services/todo.service';
import {TodoListItem} from './TodoListItem';

export const TodoList: React.FC<ITodoListProps> = ({todos, onMarkComplete}) => (
    <div className="todos">
        {todos.map(x => <TodoListItem key={x.id} todo={x} onMarkComplete={() => onMarkComplete(x)}/>)}
    </div>
);

export interface ITodoListProps {
    todos: ITodo[];

    onMarkComplete(todo: ITodo): void;
}