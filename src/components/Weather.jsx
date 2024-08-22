import React, { useEffect } from 'react';
import image from '../assets/partly-sunny.png';
import sunnyIcon from '../assets/partly-sunny.png';
import cloudIcon from '../assets/partly-sunny.png';
import rainIcon from '../assets/partly-sunny.png';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherByCityName } from '../store/Slices/weatherSlice';
import { convertTimestampToDate } from '../utils';

const Weather = () => {
  const dispatch = useDispatch();
  const { loading, data, error, lon, lat } = useSelector(
    (state) => state.weather
  );
  console.log(lon, lat);

  useEffect(() => {
    dispatch(getWeatherByCityName());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(data);

  const days = [
    { day: 'Thu', temp: '24/14', icon: sunnyIcon },
    { day: 'Fri', temp: '27/13', icon: cloudIcon },
    { day: 'Sat', temp: '26/12', icon: rainIcon },
    { day: 'Sun', temp: '22/10', icon: rainIcon },
    { day: 'Mon', temp: '22/13', icon: cloudIcon },
    { day: 'Tue', temp: '25/12', icon: sunnyIcon },
  ];

  // Check if weather data is available and has at least one item
  const weatherDescription = data?.weather?.[0]?.description || 'N/A';

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4'>
      <div className='w-3/4 h-full p-4 flex flex-col items-center justify-center gap-10'>
        {/* Header Section */}
        <div className='w-full flex flex-col items-center justify-center'>
          <h1 className='text-7xl'>
            {data?.name},{data?.sys?.country}
          </h1>
          <h3 className='text-5xl'>{convertTimestampToDate(data?.dt)}</h3>
        </div>

        {/* Main Weather Info Section */}
        <div className='w-full flex flex-col items-center justify-center gap-10'>
          <div className='w-3/4 flex items-center justify-center gap-5'>
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1 className='text-9xl'>{data?.main?.temp}</h1>
              <h2 className='text-5xl'>{weatherDescription}</h2>
            </div>
            <div className='flex items-center justify-center'>
              <img src={image} alt='Partly Sunny' className='w-1/2' />
            </div>
          </div>

          {/* Additional Weather Stats */}
          <div className='w-3/4 flex items-center justify-between'>
            <h1 className='text-3xl'>{`Max-temp: ${data?.main?.temp_max}`}</h1>
            <h1 className='text-3xl'>{`Feels like: ${data?.main?.feels_like}`}</h1>
            <h1 className='text-3xl'>{`Min-temp: ${data?.main?.temp_min}`}</h1>
          </div>
        </div>

        {/* Circular Indicators */}
        <div className='w-3/4 flex items-center justify-between'>
          <div className='w-[10rem] h-[10rem] border-[10px] border-blue-500 rounded-full flex flex-col items-center justify-center'>
            <h1 className='text-3xl'>{data?.wind?.speed}</h1>
            <h2 className='text-xl mt-2'>Wind</h2>
          </div>
          <div className='w-[10rem] h-[10rem] border-[10px] border-blue-500 rounded-full flex flex-col items-center justify-center'>
            <h1 className='text-3xl'>{`${data?.main?.humidity}%`}</h1>
            <h2 className='text-xl mt-2'>Humidity</h2>
          </div>
          <div className='w-[10rem] h-[10rem] border-[10px] border-blue-500 rounded-full flex flex-col items-center justify-center'>
            <h1 className='text-3xl'>{`${data?.main?.pressure} mb`}</h1>
            <h2 className='text-xl mt-2'>Barometer</h2>
          </div>
        </div>

        {/* Weekly Forecast Section */}
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
      </div>
    </div>
  );
};

export default Weather;
