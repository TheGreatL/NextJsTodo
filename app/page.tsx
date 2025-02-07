import Header from '@/components/header';
import TodoBody from '@/components/todo-body';
export default function DefaultPage() {
  return (
    <>
      <div className='flex min-h-screen flex-col text-white'>
        <Header />
        <TodoBody />
      </div>
    </>
  );
}

