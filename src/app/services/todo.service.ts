import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { CommonHttpService } from './common-http.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl ="https://localhost:7092/api/Todos";

  constructor(private client : CommonHttpService) { }

  getTodos() : Observable<Todo[]>{
    return this.client.sendGetRequest<Todo[]>(`${this.apiUrl}`);
  }

  addTodo(model : Todo)  : Observable<any> {
    return this.client.sendPostRequest<any>(`${this.apiUrl}`, model);
  }

  deleteTodo(id : number) : Observable<any> {
    return this.client.sendDeleteRequest<any>(`${this.apiUrl}/${id}`);
  }

  updateTodo(todo: Todo) : Observable<any> {
    return this.client.sendPutRequest<any>(`${this.apiUrl}/${todo.id}`, todo);
  }
}
