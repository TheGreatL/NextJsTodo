'use client';
import React, {useState} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '../ui/dialog';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import useTodoStore, {TodoType} from '@/store/todo-store';
import {DialogDescription, DialogTrigger} from '@radix-ui/react-dialog';
import {toast} from 'sonner';
import {Textarea} from '../ui/textarea';
import {Pencil} from 'lucide-react';

type Props = {
  todoItem: TodoType;
};

export default function EditTodoModal({todoItem}: Props) {
  const editTodo = useTodoStore((state) => state.editTodo);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnEditTodoSubmit = (formData: FormData) => {
    const taskName = formData.get('taskName') as string;
    const taskNote = formData.get('taskNote') as string;

    if (!taskName || !taskNote) {
      toast.error('You cannot leave textfield empty', {
        position: 'top-center',
        richColors: true
      });
      return;
    }
    if (taskName === todoItem.taskName && taskNote === todoItem.taskNote) {
      toast.info('You did not edit', {
        position: 'top-center',
        richColors: true
      });
      return;
    }
    const newTodo = {...todoItem, taskName, taskNote};
    editTodo(newTodo);
    toast.success('Task Edited', {
      position: 'top-center',
      richColors: true
    });
    setIsOpen(false);
  };
  return (
    <Dialog
      onOpenChange={(e) => setIsOpen(e)}
      open={isOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px]'
        onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add Task</DialogDescription>
        </DialogHeader>
        <form
          action={handleOnEditTodoSubmit}
          className='flex flex-col gap-5'>
          <Label htmlFor='taskName'>Task Name</Label>
          <Input
            defaultValue={todoItem.taskName}
            id='taskName'
            name='taskName'
          />
          <Label htmlFor='taskNote'>Note</Label>
          <Textarea
            defaultValue={todoItem.taskNote}
            id='taskNote'
            name='taskNote'
            rows={5}
            className='resize-none'
          />

          <DialogFooter>
            <Button type='submit'>Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
