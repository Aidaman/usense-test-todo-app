export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type CreateTodoDTO = {
  userId: number;
  title: string;
};
