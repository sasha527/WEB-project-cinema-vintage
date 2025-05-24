// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
     

      <Routes>
        {/* Головна сторінка з каталогом */}
        <Route path="/" element={<Home />} />

        {/* Сторінка бронювання для конкретного фільму */}
        <Route path="/booking/:movieId" element={<Booking />} />

        {/* Всі інші маршрути — 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
