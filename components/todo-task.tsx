import {TodoType} from '@/store/todo-store';
import {formatDate} from '@/util/date-helper';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Check, Circle, Loader} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import DeleteTodoModal from './dialog/delete-todo-modal';
import EditTodoModal from './dialog/edit-todo-modal';

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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`my-2 cursor-grab touch-none break-words ${isDragging ? 'opacity-40' : ''}`}>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center'>
            <h1 className='flex-1 text-2xl'>{taskName}</h1>
            <div className='space-x-5'>
              <DeleteTodoModal todoId={id} />
              <EditTodoModal todoItem={todoItems} />
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          <p>{time}</p>
          <p>{date}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <span className='flex items-center gap-2'>Status: {statusIcon}</span>
          <span>Note: {taskNote}</span>
        </div>
      </CardContent>
    </Card>
  );
}
