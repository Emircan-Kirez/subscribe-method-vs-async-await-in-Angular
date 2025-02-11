import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../todo-service/todo.service';
import { Todo } from '../model/todo-service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    const observable = new Observable<string>(observer => {
      setTimeout(() => {
        observer.next('Hello');
        observer.next('World');
        observer.complete();
      }, 2000)
    });
    
    console.log('just before subscribe');
    observable.subscribe({
      next: (x: string) => console.log('value: ' + x),
      complete: () => console.log('completed'),
    });
    console.log('just after subscribe');
  }

  // after subscribing an http request, will it publish complete event?
  getTodos() {
    this.todoService.getTodos().subscribe({
      next: (todoList: Todo[]) => console.log('length of the list: ' + todoList.length),
      complete: () => console.log('completed'),
    });
    console.log('just after subscribe');
  }

  // it waits for the response and then continues but it doesn't block the main thread
  async getTodosAsync() {
    try {
      const data = await this.todoService.getTodosAsync();
      console.log('Await - length of the list: ' + data.length);
    } catch (error) {
      console.error('🚨 Error:', error);
    }
    console.log('Await - completed ✅');
  }
  
}
