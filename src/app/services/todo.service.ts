import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, CreateTodoDTO } from '../models/todo';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CompletedFilter } from '../models/filter.enum';

@Service()
export class TodoService {
  private readonly jsonPlaceholderUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  private readonly http: HttpClient = inject(HttpClient);

  // jsonplaceholder.typicode.com does fake the process of creating a new item
  // Thus the item we get in response always has the same id
  private localId: number = 1000;

  protected readonly todosSubject = new BehaviorSubject<Todo[]>([]);
  public readonly todos$: Observable<Todo[]> = this.todosSubject
    .asObservable()
    .pipe(map((todos) => this.filterTodos(todos)));

  private _completedFilter: CompletedFilter = CompletedFilter.All;
  public get completedFilter(): CompletedFilter {
    return this._completedFilter;
  }
  public set completedFilter(value: CompletedFilter) {
    this._completedFilter = value;
    this.todosSubject.next(this.todosSubject.getValue());
  }

  constructor() {
    this.getAllTodos();
  }

  public getUserTodos(userId: number) {
    return this.http
      .get<Todo[]>(`${this.jsonPlaceholderUrl}?userId=${userId}`)
      .subscribe((todos) => this.todosSubject.next(todos));
  }

  public getAllTodos() {
    return this.http
      .get<Todo[]>(`${this.jsonPlaceholderUrl}`)
      .subscribe((todos) => this.todosSubject.next(todos));
  }

  public createTodo(newTodo: CreateTodoDTO) {
    return this.http
      .post<Todo>(`${this.jsonPlaceholderUrl}`, { ...newTodo })
      .subscribe((todo) =>
        this.todosSubject.next([...this.todosSubject.getValue(), { ...todo, id: this.localId++ }]),
      );
  }

  public deleteTodo(id: number) {
    return this.http.delete(`${this.jsonPlaceholderUrl}/${id}`).subscribe((_) => {
      const currentTodos = this.todosSubject.getValue();
      const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
      this.todosSubject.next(updatedTodos);
    });
  }

  public updateTodo(newTodo: Todo) {
    return this.http
      .patch<Todo>(`${this.jsonPlaceholderUrl}/${newTodo.id}`, newTodo)
      .subscribe((todoX) =>
        this.todosSubject.next(
          this.todosSubject.getValue().map((todo) => (todo.id === todoX.id ? todoX : todo)),
        ),
      );
  }

  public filterTodos(todos: Todo[]): Todo[] {
    switch (this.completedFilter) {
      case CompletedFilter.All:
        return todos;
      case CompletedFilter.Done:
        return todos.filter((todo) => todo.completed);
      case CompletedFilter.Active:
        return todos.filter((todo) => !todo.completed);
    }
  }
}
