import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl ="https://localhost:7092/api";

  constructor(private client : HttpClient) { }

  getTodos() : Observable<Todo[]>{
    return this.client.get<Todo[]>(`${this.apiUrl}/Todos`);
  }

}
