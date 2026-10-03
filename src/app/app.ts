import { Component, inject, signal } from '@angular/core';
import { TodoService } from './services/todo.service';
import { AsyncPipe } from '@angular/common';
import { TitleBar } from './components/title-bar/title-bar';
import { Todo } from './models/todo';
import { Observable } from 'rxjs';
import { TodoComponent } from './components/todo/todo';

@Component({
  imports: [AsyncPipe, TitleBar, TodoComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly todoService: TodoService = inject(TodoService);
  protected readonly title = signal('usense-test-task');

  protected $todos: Observable<Todo[]> = this.todoService.todos$;

  protected onDelete(id: number) {
    this.todoService.deleteTodo(id)
  }

  protected onToggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
}
