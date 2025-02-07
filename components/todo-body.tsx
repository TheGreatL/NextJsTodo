'use client';

import useAddTodoModalStore from '@/store/add-todo-modal-store';
import useTodoStore from '@/store/todo-store';
import {Active, DndContext, DragEndEvent} from '@dnd-kit/core';
import {Button} from './ui/button';
import {Plus} from 'lucide-react';
import TodoTask from './todo-task';
import Droppable from './droppable';
import {ScrollArea} from '@radix-ui/react-scroll-area';

export default function TodoBody() {
  const toggleModal = useAddTodoModalStore((state) => state.toggleModal);
  const {todos: todoItems, updateTodo} = useTodoStore((state) => state);
  // const [todoItems, setTodoItems] = useState<TodoType[]>(todoArray);

  const handleOnSetItems = (activeElement: Active) => {
    console.log(activeElement);
    updateTodo(activeElement.id as number);
  };
  function handleDragEnd(event: DragEndEvent) {
    const {over, active} = event;
    if (!over) {
      return;
    }

    handleOnSetItems(active);
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className='flex flex-1 gap-3 bg-gray-100 p-5'>
        <Button
          className=''
          onClick={toggleModal}>
          <Plus
            size={60}
            strokeWidth={5}
          />
        </Button>

        <ScrollArea className='flex flex-1 flex-col gap-2 bg-white text-black'>
          <h1 className='text-center text-2xl font-semibold'>Ongoing Task</h1>

          {todoItems
            .filter((todo) => todo.status === 'On Going')
            .map((todo) => (
              <TodoTask
                todoData={todo}
                key={todo.id}
              />
            ))}
        </ScrollArea>

        <Droppable>
          <div className='flex flex-col gap-1 p-1'>
            {todoItems
              .filter((todo) => todo.status === 'Completed')
              .map((todo) => (
                <TodoTask
                  todoData={todo}
                  key={todo.id}
                />
              ))}
          </div>
        </Droppable>
      </section>
    </DndContext>
  );
}
