import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeeklyForcast } from '../store/Slices/weeklyForcastSlice';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import { convertTimestampToDate } from '../utils';

const WeeklyForcast = ({ query }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(getWeeklyForcast({ query }));
    }
  }, [dispatch, query]);

  const { data, loading, error } = useSelector((state) => state.weeklyForcast);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const filterData = data?.filter((curr) => curr.dt_txt.includes('12:00:00'));

  return (
    <div className='w-full flex flex-col items-center mt-10'>
      <div className='w-full max-w-4xl flex flex-wrap justify-center gap-4'>
        {filterData.map((day, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

          return (
            <div
              key={index}
              className='flex flex-col items-center justify-center text-center shadow-xl rounded-3xl p-4 w-40 md:w-48'>
              <h2 className='text-lg md:text-xl'>
                {convertTimestampToDate(day.dt)}
              </h2>
              <img
                src={iconUrl}
                alt={day.weather[0].description}
                className='w-16'
              />
              <h3 className='text-lg md:text-xl flex items-center justify-center'>
                {day?.main.temp}
                <span className='text-lg md:text-xl text-blue-500'>
                  {query.units === 'metric' ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForcast;
