import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { ToasterService } from '../services/toaster.service';
import { StorageService } from '../services/storage.service';

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
  
  constructor(
    private todoService: TodoService, 
    private storageService: StorageService, 
    private toasterService : ToasterService
  ) {}

  ngOnInit(): void {
    if (this.storageService.accessToken) {
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
      (res)=>{
        this.todo = { id: 0, title: '', isCompleted: false }; // Reset the todo object
        this.toasterService.successToaster('Todo added successfully!');
        this.loadTodos();
      }
    ); 
  }

  toggleCompletion(todo: Todo) {
    //todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo).subscribe({
      next: (response: any) => {
        this.loadTodos();
        this.toasterService.successToaster('Todo updated successfully!');
      },
      error: (err) => {
        this.toasterService.errorToaster('Error occured', err);
      }
    });
  }

  delete(id : number){
    this.todoService.deleteTodo(id).subscribe(
      (res)=>{
        this.loadTodos();
        this.toasterService.successToaster('Todo deleted successfully!');
      }
    ); 
  }

  edit(todo : Todo){
    if(todo.isEditing){
      console.log(todo);
      this.todoService.updateTodo(todo).subscribe({
        next: (response: any) => {
          this.loadTodos();
        },
        error: (err) => {
          this.toasterService.errorToaster('Error occured', err);
        }
      });
    }
    todo.isEditing = !todo.isEditing;
  }
}
