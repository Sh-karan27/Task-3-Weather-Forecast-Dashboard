import React from 'react';
import LoadingVideo from '../assets/LoadingVideo.gif';

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen '>
      <img src={LoadingVideo} alt='' className='w-[100px]' />
    </div>
  );
};

export default Loading;
