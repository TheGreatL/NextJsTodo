import {TodoType} from '@/store/todo-store';
import {formatDate} from '@/util/date-helper';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Check, Circle, Loader, Pencil} from 'lucide-react';
import {Button} from './ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import DeleteTodoModal from './dialog/delete-todo-modal';
import {useState} from 'react';

type TodoTaskProps = {
  todoItems: TodoType;
};
export default function TodoTask({todoItems}: TodoTaskProps) {
  const {createdAt, id, status, taskName, taskNote} = todoItems;
  const {date, time} = formatDate(createdAt);
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id,
    data: {
      type: 'task',
      todoItems
    }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const [isHovering, setIsHovering] = useState(false);

  let statusIcon = (
    <Circle
      color='red'
      strokeWidth={3}
    />
  );

  if (status === 'Completed') {
    statusIcon = (
      <Check
        color='green'
        strokeWidth={3}
      />
    );
  } else if (status === 'On Going') {
    statusIcon = (
      <Loader
        color='blue'
        strokeWidth={3}
      />
    );
  }

  const onMouseHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const eventName = event.type.toString() as string;
    setIsHovering(eventName === 'mouseenter');
  };
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={onMouseHover}
      onMouseLeave={onMouseHover}
      className={`my-2 cursor-grab ${isDragging ? 'opacity-40' : ''}`}>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center'>
            <h1 className='flex-1 text-2xl'>{taskName}</h1>

            {isHovering && (
              <div className='space-x-5'>
                <DeleteTodoModal todoId={id} />
                <Button size={'icon'}>
                  <Pencil />
                </Button>
              </div>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          {date} {time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <span>ID: {id}</span>
          <span className='flex items-center gap-2'>Status: {statusIcon}</span>
          <span>Note: {taskNote}</span>
        </div>
      </CardContent>
    </Card>
  );
}
