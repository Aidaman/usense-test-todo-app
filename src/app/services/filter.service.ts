import { Service } from '@angular/core';
import { TodoStatus } from '../models/status.enum';
import { TodoPriorities } from '../models/priority.enum';
import { Todo } from '../models/todo';
import { BehaviorSubject } from 'rxjs';

@Service()
export class FilterService {
  public readonly completedFilter = new BehaviorSubject<TodoStatus>(TodoStatus.All);
  public readonly priorityFilter = new BehaviorSubject<TodoPriorities>(TodoPriorities.All);

  public filterTodos(
    todos: Todo[],
    status: TodoStatus = this.completedFilter.getValue(),
    priority: TodoPriorities = this.priorityFilter.getValue(),
  ): Todo[] {
    let filteredTodos = this.filterTodosByStatus(todos, status);
    filteredTodos = this.filterTodosByPriority(filteredTodos, priority);
    return filteredTodos;
  }

  public filterTodosByStatus(
    todos: Todo[],
    status: TodoStatus = this.completedFilter.getValue(),
  ): Todo[] {
    switch (status) {
      case TodoStatus.All:
        return todos;
      case TodoStatus.Done:
        return todos.filter((todo) => todo.completed);
      case TodoStatus.Active:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }

  public filterTodosByPriority(
    todos: Todo[],
    priority: TodoPriorities = this.priorityFilter.getValue(),
  ): Todo[] {
    switch (priority) {
      case TodoPriorities.High:
        return todos.filter((todo) => todo.priority === TodoPriorities.High);
      case TodoPriorities.Medium:
        return todos.filter((todo) => todo.priority === TodoPriorities.Medium);
      case TodoPriorities.Low:
        return todos.filter((todo) => todo.priority === TodoPriorities.Low);
      default:
        return todos;
    }
  }
}
