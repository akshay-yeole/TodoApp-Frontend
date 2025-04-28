import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todo : Todo = { id : 0, title :'', isCompleted : false};
  allTodos! : Todo[];
  btnLabel : string = "Edit";
  isDisabled : boolean = true;
  errorMessage = '';
  token = this.authService.getToken() ?? '';
  constructor(private todoService: TodoService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.token) {
      this.loadTodos();
    }
  }

  loadTodos(){
    this.todoService.getTodos().subscribe((res) => {
      this.allTodos = res;
    });
  }

  add(){
    this.todoService.addTodo(this.todo).subscribe(
      (res)=>this.loadTodos()
    ); 
  }

  delete(id : number){
    this.todoService.deleteTodo(id).subscribe(
      (res)=>this.loadTodos()
    ); 
  }

  edit(todo : Todo){
    if(todo.isEditing){
      this.todoService.updateTodo(todo).subscribe(
        (res)=>this.loadTodos()
      );
    }
    todo.isEditing = !todo.isEditing;
  }
}
