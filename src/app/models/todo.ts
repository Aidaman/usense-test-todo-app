import { TodoPriorities } from './priority.enum';

export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  priority: TodoPriorities;
}

export type CreateTodoDTO = {
  userId: number;
  title: string;
  priority: TodoPriorities;
};
