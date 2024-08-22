import React from 'react';
import sunnyIcon from '../assets/partly-sunny.png';
import cloudIcon from '../assets/partly-sunny.png';
import rainIcon from '../assets/partly-sunny.png';
const WeeklyForcast = () => {
  const days = [
    { day: 'Thu', temp: '24/14', icon: sunnyIcon },
    { day: 'Fri', temp: '27/13', icon: cloudIcon },
    { day: 'Sat', temp: '26/12', icon: rainIcon },
    { day: 'Sun', temp: '22/10', icon: rainIcon },
    { day: 'Mon', temp: '22/13', icon: cloudIcon },
    { day: 'Tue', temp: '25/12', icon: sunnyIcon },
  ];

  return (
    <div className='w-3/4 flex items-center justify-between mt-10'>
      {days.map((day, index) => (
        <div
          key={index}
          className='flex flex-col items-center justify-center text-center'>
          <h2 className='text-2xl'>{day.day}</h2>
          <img src={day.icon} alt={day.day} className='w-16' />
          <h3 className='text-xl'>{day.temp}°</h3>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForcast;
