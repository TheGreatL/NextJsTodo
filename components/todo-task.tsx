import {TodoType} from '@/store/todo-store';
import Draggable from './draggable';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import {Check, Trash} from 'lucide-react';
import {Button} from './ui/button';
import DeleteTodoModal from './dialog/delete-todo-modal';
import * as motion from 'motion/react-client';
type TodoTaskProps = {
  todoData: TodoType;
};
export default function TodoTask({todoData}: TodoTaskProps) {
  const {createdAt, id, taskName, status, taskNote} = todoData;

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
      whileHover={{scale: 0.999}}
      whileTap={{scale: 0.999}}>
      {status === 'Completed' ?
        <Card>
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
          <CardContent className='p-5'>
            <p className='text-sm'>Note</p>
            <h1 className='text-xl'>{taskNote}</h1>
            <h1>
              <Check
                strokeWidth={5}
                color='green'
              />
            </h1>
          </CardContent>
        </Card>
      : <Draggable id={id}>
          <>
            <CardHeader>
              <CardTitle className='text-2xl uppercase'>{taskName}</CardTitle>
              <CardDescription>{`${createdAt}`}</CardDescription>
            </CardHeader>
            <CardContent className='p-5'>
              <h1>{taskNote}</h1>
              <h1>{status}</h1>
            </CardContent>
          </>
        </Draggable>
      }
    </motion.div>
  );
}
