// src/components/Seat.jsx
import React from 'react';

export default function Seat({ row, num, status, onToggle }) {
  return (
    <div
      className={`seat ${status}`}
      onClick={() => status!=='booked' && onToggle({row, num})}
      title={`Ряд ${row}, Місце ${num}`}
    >
      <span>{num}</span>
    </div>
  );
}