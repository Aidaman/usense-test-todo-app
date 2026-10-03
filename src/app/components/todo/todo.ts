import { Component, inject, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  imports: [MatIconButton, MatIcon, FormsModule, NgClass],
  selector: 'app-todo',
  styleUrl: './todo.scss',
  templateUrl: './todo.html',
})
export class TodoComponent {
  public todo = input.required<Todo>();
  public toggleCompleted = output<Todo>();
  public delete = output<number>();

  public onDelete(id: number): void {
    this.delete.emit(id);
  }

  public onToggleCompleted(todo: Todo): void {
    this.toggleCompleted.emit(todo);
  }

  protected onEdit(id: number) {
    throw new Error('Method not implemented.');
  }
}
