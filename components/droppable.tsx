import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {ScrollArea} from './ui/scroll-area';

type Props = {
  children: React.ReactElement;
};

export default function Droppable({children}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable'
  });

  return (
    <ScrollArea
      ref={setNodeRef}
      className={`${isOver ? 'bg-gray-500' : 'bg-white'} z-0 flex-1 pr-2 text-black`}>
      <h1 className='text-center text-2xl font-semibold'>Completed Task</h1>
      <div>{children}</div>
    </ScrollArea>
  );
}
