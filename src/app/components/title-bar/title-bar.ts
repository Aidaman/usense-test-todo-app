import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { TodoStatus } from '../../models/status.enum';
import { TitleCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TodoEditorDialog, TodoFormModel } from '../todo-editor-dialog/todo-editor-dialog';
import { TodoPriorities } from '../../models/priority.enum';
import { FilterService } from '../../services/filter.service';

@Component({
  imports: [MatIcon, MatButtonToggleGroup, MatButtonToggle, TitleCasePipe, MatButton],
  selector: 'app-title-bar',
  styleUrl: './title-bar.scss',
  templateUrl: './title-bar.html',
})
export class TitleBar {
  private readonly todoService: TodoService = inject(TodoService);
  private readonly filterService: FilterService = inject(FilterService);
  private readonly dialog: MatDialog = inject(MatDialog);

  protected readonly statusFilterEnumEntries = Object.values(TodoStatus);
  protected readonly priorityFilterEnumEntries = Object.values(TodoPriorities);

  protected onAddTodo(): void {
    const dialogRef = this.dialog.open(TodoEditorDialog, { width: '400px', height: '335px' });

    dialogRef.afterClosed().subscribe((newTodo: TodoFormModel) => {
      if (newTodo) {
        this.todoService.createTodo({ ...newTodo, userId: 1 });
      }
    });
  }

  protected onStatusFilterChange(newFilterValue: TodoStatus): void {
    this.filterService.completedFilter.next(newFilterValue);
  }

  protected onPriorityFilterChange(newFilterValue: TodoPriorities): void {
    this.filterService.priorityFilter.next(newFilterValue);
  }
}
