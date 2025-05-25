import React, { useContext } from 'react';
import { BookingContext } from '../pages/BookingContext';
import Seat from './Seat';

export default function CinemaHall({ rows, cols, bookedSeats = [], onNext }) {
  const { selected, toggleSeat } = useContext(BookingContext);

  const grid = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => ({ row: i + 1, num: j + 1 }))
  );

  return (
    <div className="cinema-hall">
      <div className="seat-grid">
        {grid.map((rowArr, i) => (
          <div key={i} className="seat-row">
            {rowArr.map(({ row, num }) => {
              const isBooked = bookedSeats.some(s => s.row === row && s.num === num);
              const isSelected = selected.some(s => s.row === row && s.num === num);
              let status = 'available';

              if (isBooked) status = 'booked';
              else if (isSelected) status = 'selected';

              return (
                <Seat
                  key={`${row}-${num}`}
                  row={row}
                  num={num}
                  status={status}
                  onToggle={isBooked ? undefined : toggleSeat}
                />
              );
            })}
          </div>
        ))}
      </div>

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
