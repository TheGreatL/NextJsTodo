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
  todoItems: TodoType[];
  addTodo: (newTodo: TodoType) => void;
  updateTodo: (todoId: number, newTodoStatus: Status) => void;
  deleteTodo: (todoId: number) => void;
  reArrangeTodo: (reArrangedTodo: TodoType[]) => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todoItems: [],
  addTodo: (newTodo) =>
    set((prevState) => ({
      ...prevState,
      todoItems: [{...newTodo}, ...prevState.todoItems]
    })),
  updateTodo: (todoId, newTodoStatus) =>
    set((prevState) => ({
      ...prevState,
      todoItems: prevState.todoItems.map((todo) => {
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
      todoItems: prevState.todoItems.filter((todo) => todo.id !== todoId)
    })),
  reArrangeTodo: (reArrangedTodo) =>
    set((prevState) => ({
      ...prevState,
      todoItems: reArrangedTodo
    }))
}));
export default useTodoStore;
