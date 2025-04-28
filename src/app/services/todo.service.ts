import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl ="https://localhost:7092/api/Todos";

  constructor(private client : HttpClient) { }

  getTodos(token : string) : Observable<Todo[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.client.get<Todo[]>(`${this.apiUrl}`, { headers });
  }

  addTodo(model : Todo)  : Observable<any> {
    return this.client.post<any>(`${this.apiUrl}`, model, {headers : this.getHeaders()});
  }

  deleteTodo(id : number) : Observable<any> {
    return this.client.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateTodo(todo: Todo) : Observable<any> {
    return this.client.put<any>(`${this.apiUrl}/${todo.id}`,todo, {headers : this.getHeaders()});
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

}
