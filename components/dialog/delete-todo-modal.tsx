'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import useTodoStore from '@/store/todo-store';
import {toast} from 'sonner';
type DeleteTodoModalType = {
  trigger: React.ReactElement;
  todoId: number;
};
export default function DeleteTodoModal({trigger, todoId}: DeleteTodoModalType) {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const handleOnTodoDelete = () => {
    deleteTodo(todoId);
    toast.success('Todo task deleted successfully', {
      richColors: true,
      position: 'top-center'
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo task
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOnTodoDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
