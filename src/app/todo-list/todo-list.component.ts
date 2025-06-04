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
  
  constructor(private todoService: TodoService, private storageService: StorageService, private toasterService : ToasterService) {}

  ngOnInit(): void {
    if (this.storageService.getToken()) {
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
        this.toasterService.successToaster('Todo added successfully!');
        this.loadTodos();
      }
    ); 
  }

  delete(id : number){
    this.todoService.deleteTodo(id).subscribe(
      (res)=>this.loadTodos()
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
