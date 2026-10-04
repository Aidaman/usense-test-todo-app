import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatDialogActions, MatDialogContent, MatButton, MatDialogTitle],
  selector: 'app-delete-todo-dialog',
  styleUrl: './delete-todo-dialog.scss',
  templateUrl: './delete-todo-dialog.html',
})
export class DeleteTodoDialog {
  private readonly dialogRef: MatDialogRef<DeleteTodoDialog> = inject(
    MatDialogRef<DeleteTodoDialog>,
  );

  protected onCancel() {
    this.dialogRef.close(false);
  }

  protected onDelete() {
    this.dialogRef.close(true);
  }
}
