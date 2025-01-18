import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todo : Todo = { title :'', isCompleted : false};
  allTodos! : Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((res) => {
      this.allTodos = res;
    });
  }

  add(){
    this.todoService.addTodo(this.todo).subscribe();
  }
}
