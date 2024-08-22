import React from 'react';
import Weather from './components/Weather';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Error from './components/Error';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
