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

  getTodos() : Observable<Todo[]>{
    return this.client.get<Todo[]>(`${this.apiUrl}`);
  }

  addTodo(model : Todo)  : Observable<any> {
    console.log('add todo called');
    return this.client.post<any>(`${this.apiUrl}`, model, {headers : this.getHeaders()});
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

}
