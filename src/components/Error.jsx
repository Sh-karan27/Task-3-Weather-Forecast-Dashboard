import React from 'react';

const Error = ({ message }) => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='p-4 flex flex-col items-center justify-center gap-10'>
        <h2 className='text-5xl'>404 page not found</h2>
        <p className='text-xl'>{message}</p>

        <p
          className='text-xl underline text-blue-500 cursor-pointer'
          onClick={() => window.location.reload()}>
          Go back
        </p>
      </div>
    </div>
  );
};

export default Error;
