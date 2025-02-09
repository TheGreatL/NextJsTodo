'use client';

import useTodoStore, {Status, TodoType} from '@/store/todo-store';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  closestCenter,
  DragStartEvent,
  DragOverlay
} from '@dnd-kit/core';

import AddTodoModal from './dialog/add-todo-modal';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';

import TodoColumn from './todo-column';
import {useState} from 'react';
import TodoTask from './todo-task';

const todoColumns: {
  title: string;
  typeName: Status;
}[] = [
  {title: 'Unstarted Task', typeName: 'Unstarted'},
  {title: 'On Going Task', typeName: 'On Going'},
  {title: 'Completed Task', typeName: 'Completed'}
];
export default function TodoBody() {
  const {todoItems, updateTodo, reArrangeTodo} = useTodoStore((state) => state);
  const [activeTodo, setActiveTodo] = useState<TodoType | undefined>(undefined);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 3
      }
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function handleDragOver(event: DragEndEvent) {
    const {active, over} = event;
    if (!over) return;

    const activeTodoId = active.id as number;
    const overTodoId = over.id as number | Status;
    if (activeTodoId === overTodoId) return;

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';

    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      const activeIndex = todoItems.findIndex((todo) => todo.id === activeTodoId);
      const overIndex = todoItems.findIndex((todo) => todo.id === overTodoId);

      updateTodo(todoItems[activeIndex].id, todoItems[overIndex].status);
      return;
    }
    const isOverColumn = over.data?.current?.type === 'column';

    if (isActiveTask && isOverColumn) {
      const activeIndex = todoItems.findIndex((todo) => todo.id === activeTodoId);
      updateTodo(todoItems[activeIndex].id, overTodoId as Status);
    }

    // const
  }
  function handleDragStart(event: DragStartEvent) {
    if (event.active?.data.current?.type === 'task') {
      setActiveTodo(event.active.data.current.todoItems);
      return;
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveTodo(undefined);
    const {active, over} = event;
    if (!over) return;

    const activeTodoId = active.id as number;
    const overTodoId = over.id as number;
    if (activeTodoId === overTodoId) return;

    const activeTodoIndex = todoItems.findIndex((todo) => todo.id === activeTodoId);
    const overTodoIndex = todoItems.findIndex((todo) => todo.id === overTodoId);
    reArrangeTodo(arrayMove(todoItems, activeTodoIndex, overTodoIndex));
  }

  return (
    <>
      <AddTodoModal />
      <section className='flex flex-1 flex-col gap-3 p-5 text-black lg:flex-row'>
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}>
          {todoColumns.map((column) => (
            <TodoColumn
              key={column.typeName}
              title={column.title}
              typeName={column.typeName}
              todoItems={todoItems.filter((todoItem) => todoItem.status === column.typeName)}
            />
          ))}
          <DragOverlay>{activeTodo && <TodoTask todoItems={activeTodo} />}</DragOverlay>,
        </DndContext>
      </section>
    </>
  );
}
