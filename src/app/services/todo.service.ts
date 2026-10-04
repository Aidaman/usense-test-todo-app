import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, CreateTodoDTO } from '../models/todo';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TodoStatus } from '../models/status.enum';
import { TodoPriorities } from '../models/priority.enum';

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
    .pipe(
      map((todos) => this.filterTodosByStatus(todos)),
      map((todos) => this.filterTodosByPriority(todos)),
    );

  private _completedFilter: TodoStatus = TodoStatus.All;
  public get completedFilter(): TodoStatus {
    return this._completedFilter;
  }
  public set completedFilter(value: TodoStatus) {
    this._completedFilter = value;
    this.todosSubject.next(this.todosSubject.getValue());
  }

  private _priorityFilter: TodoPriorities = TodoPriorities.All;
  public get priorityFilter(): TodoPriorities {
    return this._priorityFilter;
  }
  public set priorityFilter(value: TodoPriorities) {
    this._priorityFilter = value;
    this.todosSubject.next(this.todosSubject.getValue());
  }

  constructor() {
    // this.getAllTodos();
    this.getUserTodos(1);
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

  public filterTodosByStatus(todos: Todo[]): Todo[] {
    switch (this.completedFilter) {
      case TodoStatus.All:
        return todos;
      case TodoStatus.Done:
        return todos.filter((todo) => todo.completed);
      case TodoStatus.Active:
        return todos.filter((todo) => !todo.completed);
    }
  }

  public filterTodosByPriority(todos: Todo[]): Todo[] {
    switch (this.priorityFilter) {
      case TodoPriorities.High:
        return todos.filter((todo) => todo.priority === TodoPriorities.High);
      case TodoPriorities.Medium:
        return todos.filter((todo) => todo.priority === TodoPriorities.Medium);
      case TodoPriorities.Low:
        return todos.filter((todo) => todo.priority === TodoPriorities.Low);
      default:
        return todos;
    }
  }
}
