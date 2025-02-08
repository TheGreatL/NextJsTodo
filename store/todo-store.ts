import {create} from 'zustand';

export type Status = 'Unstarted' | 'On Going' | 'Completed';
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
  updateTodo: (todoId: number, newTodoStatus: Status) => void;
  deleteTodo: (todoId: number) => void;
  reArrangeTodo: (reArrangedTodo: TodoType[]) => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (newTodo) =>
    set((prevState) => ({
      ...prevState,
      todos: [{...newTodo}, ...prevState.todos]
    })),
  updateTodo: (todoId, newTodoStatus) =>
    set((prevState) => ({
      ...prevState,
      todos: prevState.todos.map((todo) => {
        if (todo.id == todoId) {
          return {
            ...todo,
            status: newTodoStatus
          };
        }
        return todo;
      })
    })),
  deleteTodo: (todoId) =>
    set((prevState) => ({
      ...prevState,
      todos: prevState.todos.filter((todo) => todo.id !== todoId)
    })),
  reArrangeTodo: (reArrangedTodo) =>
    set((prevState) => ({
      ...prevState,
      todos: reArrangedTodo
    }))
}));
export default useTodoStore;
