import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../store/Slices/weatherSlice.js';
import weeklyForcastReducer from './Slices/weeklyForcastSlice.js';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    weeklyForcast: weeklyForcastReducer,
  },
});

export default store;
