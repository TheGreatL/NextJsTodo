import React from 'react';
type PropTypes = {
  children: React.ReactElement;
  backgroundColor: string;
  title: string;
};
export default function ScrollContainer({children, title, backgroundColor}: PropTypes) {
  return (
    <div className={`flex flex-1 flex-col rounded-xl py-2 pb-5 ${backgroundColor}`}>
      <h1 className='text-center text-2xl font-semibold'>{title}</h1>

      {children}
    </div>
  );
}
