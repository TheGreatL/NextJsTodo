import {TodoType} from '@/store/todo-store';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import {Trash} from 'lucide-react';
import {Button} from './ui/button';
import DeleteTodoModal from './dialog/delete-todo-modal';
import * as motion from 'motion/react-client';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
type TodoTaskProps = {
  todoData: TodoType;
};
export default function TodoTask({todoData}: TodoTaskProps) {
  const {createdAt, id, taskName, status, taskNote} = todoData;
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0}}
      transition={{
        duration: 0.4,
        scale: {type: 'spring', visualDuration: 0.4, bounce: 0.5}
      }}
      className='z-50'
      whileHover={{scale: 1.01}}
      whileDrag={{scale: 1.01}}
      whileTap={{scale: 1.01}}>
      <Card
        ref={setNodeRef}
        style={style}
        className={`z-50`}>
        <CardHeader>
          <CardTitle className='flex text-2xl uppercase'>
            <span className='flex-1'>{taskName}</span>
            <DeleteTodoModal
              todoId={id}
              trigger={
                <Button
                  variant={'destructive'}
                  size={'icon'}>
                  <Trash />
                </Button>
              }
            />
          </CardTitle>
          <CardDescription>{`${createdAt}`}</CardDescription>
        </CardHeader>
        <CardContent
          {...listeners}
          {...attributes}
          className='z-50 p-5'>
          <h1>{taskNote}</h1>
          <h1>{status}</h1>
          <h1>Task ID:{id}</h1>
        </CardContent>
      </Card>
    </motion.div>
  );
}
