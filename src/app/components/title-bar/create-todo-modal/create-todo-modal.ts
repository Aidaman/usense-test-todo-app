import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { TodoPriorities } from '../../../models/priority.enum';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';

export interface NewTodoData {
  title: string;
  priority: TodoPriorities;
}

@Component({
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormField,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    TitleCasePipe,
  ],
  selector: 'app-create-todo-modal',
  styleUrl: './create-todo-modal.scss',
  templateUrl: './create-todo-modal.html',
})
export class CreateTodoModal {
  private readonly dialogRef: MatDialogRef<CreateTodoModal> = inject(MatDialogRef<CreateTodoModal>);
  private readonly todoModel = signal<NewTodoData>({
    title: 'New Todo',
    priority: TodoPriorities.Medium,
  });

  protected readonly todoForm = form(this.todoModel);
  protected readonly priorityEnumEntries = Object.values(TodoPriorities).filter(value => value !== TodoPriorities.All);

  protected onSave(): void {
    if (this.todoForm().valid()) {
      this.dialogRef.close(this.todoForm().value());
    }
  }

  protected onCancel(): void {
    this.dialogRef.close();
  }
}
