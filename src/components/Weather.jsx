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
      <div className='w-full max-w-4xl p-4 flex flex-col items-center justify-center gap-8'>
        <div className='w-full flex flex-col items-center gap-4 md:flex-row md:justify-between'>
          <input
            type='text'
            placeholder='Enter city name'
            className='border p-4 bg-white text-blue-500 rounded-xl outline-none w-full md:w-1/3'
            onChange={handleOnChange}
          />
          <div className='flex gap-4'>
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
        </div>

        {/* Header Section */}
        {loading && <Loading />}
        {error && <Error message='Invalid city name. Please try again.' />}

        {!loading && !error && (
          <div className='w-full flex flex-col items-center gap-6 md:flex-row md:justify-between shadow-xl rounded-xl p-6'>
            <div className='flex flex-col items-center gap-4'>
              <h1 className='text-4xl md:text-5xl'>
                {data?.name}, {data?.sys?.country}
              </h1>
              <h3 className='text-lg md:text-xl text-gray-400'>
                {convertTimestampToDate(data?.dt)}
              </h3>
            </div>
            <div className='flex flex-col items-center gap-4 md:flex-row md:gap-8'>
              <div className='flex flex-col items-center'>
                <h1 className='text-4xl md:text-5xl flex items-center gap-2'>
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
              <div className='flex items-center gap-4'>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                  alt='Weather Icon'
                  className='w-24 md:w-32'
                />
                <h2 className='text-xl md:text-2xl text-gray-400'>{weatherDescription}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Main Weather Info Section */}
        <div className='w-full flex flex-col items-center gap-8'>
          {/* Additional Weather Stats */}
          {!loading && !error && (
            <div className='w-full flex flex-col items-center gap-4 md:flex-row md:justify-between'>
              <h1 className='text-xl md:text-2xl flex items-center gap-2'>
                {`Max-temp: ${data?.main?.temp_max}`}
                <span className='text-lg text-blue-500'>
                  {query.units === 'metric' ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </h1>
              <h1 className='text-xl md:text-2xl flex items-center gap-2'>
                {`Feels like: ${data?.main?.feels_like}`}
                <span className='text-lg text-blue-500'>
                  {query.units === 'metric' ? (
                    <RiCelsiusFill />
                  ) : (
                    <RiFahrenheitFill />
                  )}
                </span>
              </h1>
              <h1 className='text-xl md:text-2xl flex items-center gap-2'>
                {`Min-temp: ${data?.main?.temp_min}`}
                <span className='text-lg text-blue-500'>
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
          <div className='w-full flex flex-col items-center gap-8 md:flex-row md:justify-between'>
            <div className='w-24 h-24 border-4 border-blue-500 rounded-full flex flex-col items-center justify-center'>
              <h1 className='text-xl md:text-md'>{data?.wind?.speed}</h1>
              <h2 className='text-sm md:text-md mt-1'>Wind</h2>
            </div>
            <div className='w-24 h-24 border-4 border-blue-500 rounded-full flex flex-col items-center justify-center'>
              <h1 className='text-xl md:text-md'>{`${data?.main?.humidity}%`}</h1>
              <h2 className='text-sm md:text-md mt-1'>Humidity</h2>
            </div>
            <div className='w-24 h-24 border-4 border-blue-500 rounded-full flex flex-col items-center justify-center'>
              <h1 className='text-xl md:text-md'>{`${data?.main?.pressure} mb`}</h1>
              <h2 className='text-sm md:text-md mt-1'>Barometer</h2>
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
