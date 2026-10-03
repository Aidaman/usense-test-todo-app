import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoDTO } from '../models/todo';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Service()
export class TodoService {
  private readonly jsonPlaceholderUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  private readonly http: HttpClient = inject(HttpClient);

  protected readonly todosSubject = new BehaviorSubject<Todo[]>([]);
  public readonly todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() {
    this.getAllTodos();
  }

  public getUserTodos(userId: number) {
    return this.http.get<Todo[]>(`${this.jsonPlaceholderUrl}?userId=${userId}`).subscribe(todos => this.todosSubject.next(todos));
  }

  public getAllTodos() {
    return this.http.get<Todo[]>(`${this.jsonPlaceholderUrl}`).subscribe(todos => this.todosSubject.next(todos));
  }

  public createTodo(newTodo: TodoDTO) {
    return this.http
      .post<Todo>(`${this.jsonPlaceholderUrl}/create`, newTodo)
      .subscribe((todo) => this.todosSubject.next([...this.todosSubject.getValue(), todo]));
  }

  public deleteTodo(id: number) {
    return this.http.delete(`${this.jsonPlaceholderUrl}/${id}`).subscribe((_) => {
      const currentTodos = this.todosSubject.getValue();
      const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
      this.todosSubject.next(updatedTodos);
    });
  }

  public updateTodo(newTodo: Todo) {
    return this.http.patch<Todo>(`${this.jsonPlaceholderUrl}/${newTodo.id}`, newTodo).subscribe(
      todoX => this.todosSubject.next(this.todosSubject.getValue().map(todo => todo.id === todoX.id ? todoX : todo)),
    );
  }
}
