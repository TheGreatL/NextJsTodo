import React from 'react';
import ScrollContainer from './scroll-container';
import {rectSortingStrategy, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {Status, TodoType} from '@/store/todo-store';
import TodoTask from './todo-task';
import {DragOverlay, useDraggable, useDroppable} from '@dnd-kit/core';

type Props = {
  title: string;
  typeName: Status;
  todoData: TodoType[];
};

export default function TodoColumn({title, todoData, typeName}: Props) {
  const data = todoData.filter((todo) => todo.status === typeName);
  let backgroundColor = 'bg-gray-200';
  if (typeName === 'On Going') backgroundColor = 'bg-gray-300';
  else if (typeName === 'Completed') backgroundColor = 'bg-gray-400';

  const {setNodeRef, isOver} = useDroppable({
    id: typeName
  });
  return (
    <>
      <ScrollContainer
        title={title}
        backgroundColor={isOver ? 'bg-red-200' : backgroundColor}>
        <div
          ref={setNodeRef}
          className='z-0 flex flex-1 flex-col gap-5 pl-1 pr-2'>
          <SortableContext
            items={data}
            strategy={rectSortingStrategy}>
            {data.map((todo) => (
              <TodoTask
                todoData={todo}
                key={todo.id}
              />
            ))}
          </SortableContext>
        </div>
      </ScrollContainer>
    </>
  );
}
