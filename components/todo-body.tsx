'use client';

import useTodoStore, {Status} from '@/store/todo-store';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  closestCenter
} from '@dnd-kit/core';

import AddTodoModal from './dialog/add-todo-modal';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';

import TodoColumn from './todo-column';

const todoColumns: {
  title: string;
  typeName: Status;
}[] = [
  {title: 'Unstarted Task', typeName: 'Unstarted'},
  {title: 'On Going Task', typeName: 'On Going'},
  {title: 'Completed Task', typeName: 'Completed'}
];
export default function TodoBody() {
  const {todos: todoItems, updateTodo, reArrangeTodo} = useTodoStore((state) => state);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const {over, active} = event;

    if (!over) {
      return;
    }
    // console.log(active.id, over.id, event);
    // const itemStatus = todoItems.find((item) => item.id === active.id);
    // console.log(itemStatus);
    // if (
    //   active.id !== over.id &&
    //   itemStatus?.status !== over.id &&
    //   (over.id === 'Unstarted' || over.id === 'On Going' || over.id === 'Completed')
    // ) {
    //   console.log(true);
    //   const todoId = active.id as number;
    //   const newTodoStatus = over.id as Status;
    //
    // }
    console.log(over, active);
    if (active.id === over.id) return;

    if (over.id === 'On Going' || over.id === 'Unstarted' || over.id === 'Completed') {
      // Move to different Columns
      console.log(active, over);
      const todoId = active.id as number;
      const newTodoStatus = over.id as Status;
      updateTodo(todoId, newTodoStatus);
      return;
    }

    const activeIndex = active.data?.current?.sortable.index;
    const overIndex = over.data?.current?.sortable.index;

    reArrangeTodo(arrayMove(todoItems, activeIndex, overIndex));
  }
  return (
    <DndContext
      onDragOver={handleDragEnd}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}>
      <AddTodoModal />
      <section className='flex flex-1 flex-col gap-3 p-5 text-black lg:flex-row'>
        {todoColumns.map((column) => (
          <TodoColumn
            key={column.typeName}
            title={column.title}
            typeName={column.typeName}
            todoData={todoItems}
          />
        ))}
      </section>
    </DndContext>
  );
}
