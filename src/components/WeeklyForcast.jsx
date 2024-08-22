import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeeklyForcast } from '../store/Slices/weeklyForcastSlice';

const WeeklyForcast = () => {
  const dispatch = useDispatch();
  const { lon, lat } = useSelector((state) => state.weather);

  useEffect(() => {
    if (lat && lon) {
      dispatch(getWeeklyForcast({ lat, lon }));
    }
  }, [lat, lon, dispatch]);

  const { data, loading, error } = useSelector((state) => state.weeklyForcast);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const filterData = data?.filter((curr) => curr.dt_txt.includes('12:00:00'));

  console.log(filterData);
  return (
    <div className='w-3/4 flex items-center justify-between mt-10'>
      <div className='w-3/4 flex items-center justify-between mt-10'>
        {filterData.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
          });
          const temp = Math.round(day.main.temp - 273.15); // Convert from Kelvin to Celsius
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

          return (
            <div
              key={index}
              className='flex flex-col items-center justify-center text-center'>
              <h2 className='text-2xl'>{date}</h2>
              <img
                src={iconUrl}
                alt={day.weather[0].description}
                className='w-16'
              />
              <h3 className='text-xl'>{day?.main.temp}°C</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForcast;
