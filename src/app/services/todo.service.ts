import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoDTO } from '../models/todo';
import { Observable } from 'rxjs';

@Service()
export class TodoService {
  private readonly jsonPlaceholderUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  private readonly http: HttpClient = inject(HttpClient);

  public getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.jsonPlaceholderUrl}/${id}`);
  }

  public getUserTodos(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.jsonPlaceholderUrl}?userId=${userId}`);
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.jsonPlaceholderUrl}`);
  }

  public createTodo(newTodo: TodoDTO): Observable<Todo> {
    return this.http.post<Todo>(`${this.jsonPlaceholderUrl}/create`, newTodo);
  }

  public deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.jsonPlaceholderUrl}/${id}`);
  }

  public updateTodo(id: number, newTodo: TodoDTO): Observable<Todo> {
    return this.http.patch<Todo>(`${this.jsonPlaceholderUrl}/${id}`, JSON.stringify(newTodo));
  }
}
