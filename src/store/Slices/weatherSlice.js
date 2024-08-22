import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../../constants';

const initialState = {
  loading: null,
  data: [],
  error: null,
  lon: null || 77.2167,
  lat:null|| 28.6667,
};

export const getWeatherByCityName = createAsyncThunk(
  '/weather/city',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=London&limit=5&appid=${API_KEY}&units=metric`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCityName.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getWeatherByCityName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lon = action.payload.coord.lon;
        state.lat = action.payload.coord.lat;

        state.error = false;
      })
      .addCase(getWeatherByCityName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
