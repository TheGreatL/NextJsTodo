import {create} from 'zustand';

type Status = 'On Going' | 'Completed';
export interface TodoType {
  id: number;
  taskName: string;
  taskNote: string;
  createdAt: Date;
  status: Status;
}
type TodoStore = {
  todos: TodoType[];
  addTodo: (newTodo: TodoType) => void;
  updateTodo: (todoId: number) => void;
  deleteTodo: (todoId: number) => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (newTodo) =>
    set((prevState) => ({
      ...prevState,
      todos: [{...newTodo}, ...prevState.todos]
    })),
  updateTodo: (todoId) =>
    set((prevState) => ({
      ...prevState,
      todos: prevState.todos.map((todo) => {
        if (todo.id == todoId) {
          return {
            ...todo,
            status: 'Completed'
          };
        }
        return todo;
      })
    })),
  deleteTodo: (todoId) =>
    set((prevState) => ({
      ...prevState,
      todos: prevState.todos.filter((todo) => todo.id !== todoId)
    }))
}));
export default useTodoStore;
