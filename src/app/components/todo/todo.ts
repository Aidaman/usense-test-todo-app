import { Component, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Todo } from '../../models/todo';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditorDialog } from '../todo-editor-dialog/todo-editor-dialog';

@Component({
  imports: [MatIconButton, MatIcon, FormsModule, NgClass],
  selector: 'app-todo',
  styleUrl: './todo.scss',
  templateUrl: './todo.html',
})
export class TodoComponent {
  private readonly dialog: MatDialog = inject(MatDialog);

  public todo = input.required<Todo>();
  public toggleCompleted = output<Todo>();
  public edit = output<Todo>();
  public delete = output<number>();

  public onDelete(id: number): void {
    this.delete.emit(id);
  }

  public onToggleCompleted(todo: Todo): void {
    this.toggleCompleted.emit(todo);
  }

  protected onEdit() {
    const dialogRef = this.dialog.open(
      TodoEditorDialog,
      { width: '400px', height: '335px', data: this.todo() }
    );

    dialogRef.afterClosed().subscribe((newTodo) => {
      if (newTodo) {
        this.edit.emit({
          ...this.todo(),
          title: newTodo.title,
          priority: newTodo.priority,
        });
      }
    });
  }
}
