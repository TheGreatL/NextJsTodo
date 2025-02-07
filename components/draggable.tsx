import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {Card} from './ui/card';

type Props = {
  children: React.ReactElement;
  id: number;
};
export default function Draggable({children, id}: Props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id
  });
  const style =
    transform ?
      {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <Card
      className='z-10'
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      {children}
    </Card>
  );
}
