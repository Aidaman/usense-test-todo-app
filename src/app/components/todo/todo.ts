import { Component, input } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  imports: [],
  selector: 'app-todo',
  styleUrl: './todo.scss',
  templateUrl: './todo.html',
})
export class TodoComponent {
  public todo = input.required<Todo>();

  public onDelete(id: number): void {
      throw new Error('Method not implemented.');
  }

  public onToggleCompleted(id: number): void {
    throw new Error('Method not implemented.');
  }

  protected onEdit(id: number) {
    throw new Error('Method not implemented.');
  }
}
