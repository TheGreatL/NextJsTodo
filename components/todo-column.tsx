import {Status, TodoType} from '@/store/todo-store';
import TodoTask from './todo-task';
import {SortableContext} from '@dnd-kit/sortable';
import {useMemo} from 'react';
import {useDroppable} from '@dnd-kit/core';

type Props = {
  title: string;
  typeName: Status;
  todoItems: TodoType[];
};

export default function TodoColumn({title, todoItems, typeName}: Props) {
  const todoId = useMemo(() => todoItems.map((todo) => todo.id), [todoItems]);

  const {setNodeRef, isOver} = useDroppable({
    id: typeName,
    data: {
      type: 'column',
      typeName
    }
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 flex-col rounded-xl ${isOver ? 'bg-gray-200' : 'bg-white'} py-2 pb-5`}>
      <h1 className='text-center text-2xl font-semibold'>{title}</h1>
      <SortableContext items={todoId}>
        {todoItems.map((todo) => (
          <TodoTask
            key={todo.id}
            todoItems={todo}
          />
        ))}
      </SortableContext>
    </div>
  );
}
