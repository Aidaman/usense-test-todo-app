import { Component, inject } from '@angular/core';
import { TodoService } from './services/todo.service';
import { AsyncPipe } from '@angular/common';
import { TitleBar } from './components/title-bar/title-bar';
import { Todo } from './models/todo';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoComponent } from './components/todo/todo';
import { FilterService } from './services/filter.service';

@Component({
  imports: [AsyncPipe, TitleBar, TodoComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly todoService: TodoService = inject(TodoService);
  private readonly filterService: FilterService = inject(FilterService);

  protected $todos: Observable<Todo[]> = combineLatest([
    this.todoService.todos$,
    this.filterService.completedFilter,
    this.filterService.priorityFilter,
  ]).pipe(
    map(([todos, status, priority]) => this.filterService.filterTodos(todos, status, priority)),
  );

  protected onDelete(id: number) {
    this.todoService.deleteTodo(id);
  }

  protected onToggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  protected onEdit(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
}
