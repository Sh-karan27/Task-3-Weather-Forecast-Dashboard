import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherByCityName } from '../store/Slices/weatherSlice';

const Error = () => {
  return <div>Error</div>;
};

export default Error;
