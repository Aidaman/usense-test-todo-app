import { Component, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { CompletedFilter } from '../../models/filter.enum';
import { TitleCasePipe } from '@angular/common';

interface NewTodoData {
  title: string;
}

@Component({
  imports: [
    MatIcon,
    MatIconButton,
    FormField,
    MatButtonToggleGroup,
    MatButtonToggle,
    TitleCasePipe,
  ],
  selector: 'app-title-bar',
  styleUrl: './title-bar.scss',
  templateUrl: './title-bar.html',
})
export class TitleBar {
  private readonly todoService: TodoService = inject(TodoService);

  private readonly todoModel = signal<NewTodoData>({ title: 'New Todo' });

  protected readonly filterEnumEntries = Object.values(CompletedFilter);
  protected readonly todoForm = form(this.todoModel);

  protected onAddTodo(): void {
    this.todoService.createTodo({ title: this.todoForm.title().value(), userId: 1 });
  }

  protected onFilterChange(newFilterValue: CompletedFilter): void {
    this.todoService.completedFilter = newFilterValue;
  }
}
