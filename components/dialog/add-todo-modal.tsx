'use client';
import React from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '../ui/dialog';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import useAddTodoModalStore from '@/store/add-todo-modal-store';
import useTodoStore from '@/store/todo-store';
import {DialogDescription} from '@radix-ui/react-dialog';
import {toast} from 'sonner';
import {Textarea} from '../ui/textarea';

export default function AddTodoModal() {
  const {toggleModal, isOpen} = useAddTodoModalStore((state) => state);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleOnAddTodoSubmit = (formData: FormData) => {
    const taskName = formData.get('taskName') as string;
    const taskNote = formData.get('taskNote') as string;

    if (!taskName || !taskNote) {
      toast.error('You cannot leave textfield empty', {
        position: 'top-left',
        richColors: true
      });
      return;
    }

    addTodo({
      taskName,
      taskNote,
      createdAt: new Date(),
      status: 'On Going',
      id: Math.random() * (5000 - 1) + 1
    });
    toggleModal();
    toast.success('Task Added', {
      position: 'top-center',
      richColors: true
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={toggleModal}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Add Task</DialogDescription>
        </DialogHeader>
        <form
          action={handleOnAddTodoSubmit}
          className='flex flex-col gap-5'>
          <Label htmlFor='taskName'>Task Name</Label>
          <Input
            id='taskName'
            name='taskName'
          />
          <Label htmlFor='taskNote'>Note</Label>
          <Textarea
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
