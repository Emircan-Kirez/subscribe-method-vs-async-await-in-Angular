import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Todo } from '../model/todo-service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private readonly http: HttpClient) { }

  getTodos(): Observable<Todo[]>{
    // https://jsonplaceholder.typicode.com/todos?userId=1
    return this.http.get<Todo[]>(this.apiUrl, {params: {userId: '1'}});
  }

  async getTodosAsync(): Promise<Todo[]> {  
    return await firstValueFrom(this.http.get<Todo[]>(this.apiUrl, {params: {userId: '1'}}));
  }
}
