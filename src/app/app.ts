import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './services/todo.service';
import { TodoComponent } from './components/todo/todo';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [RouterOutlet, TodoComponent, AsyncPipe],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly todoService: TodoService = inject(TodoService);
  protected readonly title = signal('usense-test-task');

  public readonly $todos = this.todoService.getUserTodos(1);
}
