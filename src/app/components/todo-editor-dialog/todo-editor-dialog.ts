import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TodoPriorities } from '../../models/priority.enum';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';

export interface TodoFormModel {
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
    MatError,
  ],
  selector: 'app-todo-editor-dialog',
  styleUrl: './todo-editor-dialog.scss',
  templateUrl: './todo-editor-dialog.html',
})
export class TodoEditorDialog {
  protected readonly data: TodoFormModel | null = inject(MAT_DIALOG_DATA);

  private readonly dialogRef: MatDialogRef<TodoEditorDialog> = inject(
    MatDialogRef<TodoEditorDialog>,
  );
  private readonly todoModel = signal<TodoFormModel>({
    title: this.data ? this.data!.title : 'New Todo',
    priority: this.data ? this.data!.priority : TodoPriorities.Medium,
  });

  protected readonly todoForm = form(this.todoModel, (path) => {
    required(path.title, { message: 'Title is required' });
  });
  protected readonly priorityEnumEntries = Object.values(TodoPriorities).filter(
    (value) => value !== TodoPriorities.All,
  );

  protected onSave(): void {
    if (this.todoForm().valid()) {
      this.dialogRef.close(this.todoForm().value());
    }
  }

  protected onCancel(): void {
    this.dialogRef.close();
  }
}
