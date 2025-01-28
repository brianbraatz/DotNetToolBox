import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';
import {TodoService} from './services/todo.service';
import * as serviceWorker from './serviceWorker';

interface IConfig {
    baseUrl: string;
}

const config = (window as any).APP_CONFIG;

const todoService = new TodoService(config.baseUrl);

ReactDOM.render(<App todoService={todoService}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
