'use client';
import React, {useState} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '../ui/dialog';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import useTodoStore from '@/store/todo-store';
import {DialogDescription, DialogTrigger} from '@radix-ui/react-dialog';
import {toast} from 'sonner';
import {Textarea} from '../ui/textarea';
import {Plus} from 'lucide-react';

export default function AddTodoModal() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnAddTodoSubmit = (formData: FormData) => {
    const taskName = formData.get('taskName') as string;
    const taskNote = formData.get('taskNote') as string;

    if (!taskName || !taskNote) {
      toast.error('You cannot leave textfield empty', {
        position: 'top-center',
        richColors: true
      });
      return;
    }

    addTodo({
      taskName,
      taskNote,
      createdAt: new Date(),
      status: 'Unstarted',
      id: Math.round(Math.random() * (5000 - 1) + 1)
    });
    toast.success('Task Added', {
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
        <Button>
          <Plus
            size={60}
            strokeWidth={5}
          />
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
