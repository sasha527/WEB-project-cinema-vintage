// src/components/BookingSummary.jsx
import React, { useContext, useState } from 'react';
import { BookingContext } from '../pages/BookingContext';

export default function BookingSummary({ movie }) {
  const { selected, clearSeats } = useContext(BookingContext);
  const [form, setForm] = useState({ email:'', phone:'', name:'' });

  const price = 8;
  const total = selected.length * price;

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Заброньовано ${selected.length} квитків на "${movie.title}"!`);
    clearSeats();
  };

  return (
    <form className="booking-summary" onSubmit={handleSubmit}>
      <div className="summary-info">
        <h3>{movie.title}</h3>
        <p>Місця: {selected.map(s=>`${s.row}-${s.num}`).join(', ')}</p>
        <p>Вартість: {total} $</p>
      </div>
      <div className="summary-form">
        <label>Електронна скринька
          <input type="email" required
            value={form.email}
            onChange={e=>setForm({...form, email:e.target.value})}
          />
        </label>
        <label>Номер телефону
          <input type="tel" required
            value={form.phone}
            onChange={e=>setForm({...form, phone:e.target.value})}
          />
        </label>
        <label>Повне ім’я
          <input type="text" required
            value={form.name}
            onChange={e=>setForm({...form, name:e.target.value})}
          />
        </label>
        <button type="submit" className="btn-next btn-data">
          Підтвердити бронювання
        </button>
      </div>
    </form>
  );
}
