import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherByCityName } from '../store/Slices/weatherSlice';
import { convertTimestampToDate } from '../utils';
import WeeklyForcast from './WeeklyForcast';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import Loading from './Loading';
import Error from './Error'; // Import the Error component

const Weather = () => {
  const [query, setQuery] = useState({
    city: 'Delhi',
    units: 'metric',
  });

  const [metric, setMetric] = useState(true); // State to toggle between metric and imperial units
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(getWeatherByCityName({ query }));
  }, [dispatch, query.units]); // Add query as a dependency

  const toggleUnits = () => {
    setMetric((prevMetric) => {
      const newMetric = !prevMetric;
      setQuery((prevQuery) => ({
        ...prevQuery,
        units: newMetric ? 'metric' : 'imperial', // Use the new metric value
      }));
      return newMetric;
    });
  };

  const handleOnChange = (e) => {
    setQuery((pre) => ({
      ...pre,
      city: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeatherByCityName({ query }));
  };

  const weatherDescription = data?.weather?.[0]?.description || 'N/A';
  const weatherIcon = data?.weather?.[0]?.icon || 'default-icon';

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4'>
      <div className='w-3/4 h-full p-4 flex flex-col items-center justify-center gap-10'>
        <div className='flex items-center gap-4'>
          <input
            type='text'
            placeholder='Enter city name'
            className='border p-4 bg-white-500 text-blue-500 rounded-xl outline-none'
            onChange={handleOnChange}
          />
          <button
            className='border p-4 bg-blue-500 text-white rounded-xl'
            onClick={handleSubmit}>
            Search
          </button>
          <button
            onClick={toggleUnits}
            className='border p-4 bg-gray-500 text-white rounded-xl'>
            {metric ? 'Switch to Imperial' : 'Switch to Metric'}
          </button>
        </div>

        {/* Header Section */}
        {loading && <Loading />}
        {error && <Error message='Invalid city name. Please try again.' />}

        {!loading && !error && (
          <div className='w-3/4 flex items-center justify-between gap-10'>
            <div className='w-full flex flex-col items-center justify-center gap-5'>
              <h1 className='text-7xl'>
                {data?.name}, {data?.sys?.country}
              </h1>
              <h3 className='text-3xl text-gray-400'>
                {convertTimestampToDate(data?.dt)}
              </h3>
            </div>
            <div className='w-3/4 flex items-center justify-center gap-5'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <h1 className='text-5xl flex items-center justify-center gap-2'>
                  {data?.main?.temp}
                  <span className='text-3xl text-blue-500'>
                    {query.units === 'metric' ? (
                      <RiCelsiusFill />
                    ) : (
                      <RiFahrenheitFill />
                    )}
                  </span>
                </h1>
              </div>
              <div className='flex  items-center justify-center'>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                  alt='Weather Icon'
                  className='w-[10rem]'
                />

                <h2 className='text-3xl text-gray-400'>{weatherDescription}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Main Weather Info Section */}
        <div className='w-full flex flex-col items-center justify-center gap-10'>
          {/* Additional Weather Stats */}
          {!loading && !error && (
            <div className='w-3/4 flex items-center justify-between'>
              <h1 className='text-3xl flex items-center justify-center gap-2'>
                {`Max-temp: ${data?.main?.temp_max}`}
                <span className='text-xl text-blue-500'>
                  {query.units === 'metric' ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </h1>
              <h1 className='text-3xl flex items-center justify-center gap-2'>
                {`Feels like: ${data?.main?.feels_like}`}
                <span className='text-xl text-blue-500'>
                  {query.units === 'metric' ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </h1>
              <h1 className='text-3xl flex items-center justify-center gap-2'>
                <span>{`Min-temp: ${data?.main?.temp_min}`}</span>
                <span className='text-xl text-blue-500'>
                  {query.units === 'metric' ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </h1>
            </div>
          )}
        </div>

        {/* Circular Indicators */}
        {!loading && !error && (
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
        )}

        {/* Weekly Forecast Section */}
        {!loading && !error && <WeeklyForcast query={query} />}
      </div>
    </div>
  );
};

export default Weather;
