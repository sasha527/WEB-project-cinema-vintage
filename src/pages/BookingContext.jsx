// src/pages/BookingContext.jsx
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [selected, setSelected] = useState([]);

  const toggleSeat = ({row, num}) => {
    const exists = selected.some(s=>s.row===row && s.num===num);
    setSelected(exists
      ? selected.filter(s=>!(s.row===row&&s.num===num))
      : [...selected, {row, num}]
    );
  };

  const clearSeats = () => setSelected([]);

  return (
    <BookingContext.Provider value={{selected, toggleSeat, clearSeats}}>
      {children}
    </BookingContext.Provider>
  );
}