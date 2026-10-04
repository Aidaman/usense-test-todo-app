import { Component, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';
import { form, FormField } from '@angular/forms/signals';

interface NewTodoData {
  title: string;
}

@Component({
  imports: [MatIcon, MatIconButton, FormField],
  selector: 'app-title-bar',
  styleUrl: './title-bar.scss',
  templateUrl: './title-bar.html',
})
export class TitleBar {
  private readonly todoService: TodoService = inject(TodoService);

  private readonly todoModel = signal<NewTodoData>({ title: 'New Todo' });
  protected readonly todoForm = form(this.todoModel);

  protected onAddTodo(): void {
    this.todoService.createTodo({title: this.todoForm.title().value(), userId: 1 })
  }
}
