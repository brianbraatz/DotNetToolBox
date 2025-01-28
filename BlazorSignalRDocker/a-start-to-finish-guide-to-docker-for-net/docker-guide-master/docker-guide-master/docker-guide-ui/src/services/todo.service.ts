import axios from 'axios';

export interface ITodo{
    id: number;
    name: string;
}
export class TodoService {
    constructor(private baseUrl: string) {
    }

    public async getAll(): Promise<ITodo[]> {
        return axios.get(`${this.baseUrl}/api/todos`).then(x => x.data || []);
    }

    public async add(todo: string): Promise<ITodo> {
        return axios.post(`${this.baseUrl}/api/todos`, {name: todo}).then(x => x.data);
    }

    public async remove(todo: ITodo): Promise<void> {
        return axios.delete(`${this.baseUrl}/api/todos/${todo.id}`);
    }
}