import React from 'react';

export default function Seat({ row, num, status, onToggle }) {
  const handleClick = () => {
    if (onToggle) {
      onToggle({ row, num });
    }
  };

  return (
    <div
      className={`seat ${status}`}
      onClick={handleClick}
      style={{ cursor: status === 'booked' ? 'not-allowed' : 'pointer' }}
      title={
        status === 'booked'
          ? 'Вже заброньовано'
          : `Ряд ${row}, місце ${num}`
      }
    >
      {num}
    </div>
  );
}
