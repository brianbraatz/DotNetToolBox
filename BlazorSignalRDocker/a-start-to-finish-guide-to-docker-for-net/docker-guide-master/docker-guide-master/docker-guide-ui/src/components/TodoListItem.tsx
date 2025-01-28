import * as React from 'react';
import {ITodo} from '../services/todo.service';

export const TodoListItem: React.FC<ITodoListItemProps> = ({todo, onMarkComplete}) =>
    <div className="todo" onClick={onMarkComplete}>{todo.name}</div>;

export interface ITodoListItemProps {
    todo: ITodo;

    onMarkComplete(): void;
}