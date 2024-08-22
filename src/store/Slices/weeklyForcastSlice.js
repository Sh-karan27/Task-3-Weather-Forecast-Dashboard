import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../../constants/index.js';
const initialState = {
  loading: null,
  data: [],
  error: null,
};

export const getWeeklyForcast = createAsyncThunk(
  '/weather/weekly',

  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      console.log(lat, lon);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=${API_KEY}&units=metric`
      );

      // console.log(response);

      return response.data.list;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const weeklyForcastSlice = createSlice({
  name: 'weeklyForcast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeeklyForcast.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getWeeklyForcast.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
      })
      .addCase(getWeeklyForcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weeklyForcastSlice.reducer;
