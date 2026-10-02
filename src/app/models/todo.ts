export type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type TodoDTO = {
  userId: number;
  title: string;
  completed: boolean;
};
