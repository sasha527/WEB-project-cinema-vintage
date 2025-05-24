// src/components/CinemaHall.jsx
import React, { useContext } from 'react';
// виправимо імпорт на правильний шлях
import { BookingContext } from '../pages/BookingContext';
import Seat from './Seat';

export default function CinemaHall({ rows, cols, onNext }) {
  const { selected, toggleSeat } = useContext(BookingContext);

  const grid = Array.from({length: rows}, (_, i) =>
    Array.from({length: cols}, (_, j) => ({ row: i+1, num: j+1 }))
  );

  return (
    <div className="cinema-hall">
      <div className="seat-grid">
        {grid.map((rowArr, i) =>
          <div key={i} className="seat-row">
            {rowArr.map(({row, num}) =>
              <Seat
                key={`${row}-${num}`}
                row={row}
                num={num}
                status={ selected.some(s=>s.row===row && s.num===num) ? 'selected' : 'available' }
                onToggle={toggleSeat}
              />
            )}
          </div>
        )}
      </div>

     {/* Виводимо список обраних місць */}
     {selected.length > 0 && (
       <p className="selected-list">
         Обрано місць: {selected.length} ({selected.map(s => `${s.row}-${s.num}`).join(', ')})
       </p>
     )}

      <button
        className="btn-next btn-hall"
        disabled={selected.length === 0}
        onClick={onNext}
      >
        Ввести дані
      </button>
    </div>
  );
}
