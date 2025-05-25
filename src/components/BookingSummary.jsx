import React, { useContext, useState } from 'react';
import { BookingContext } from '../pages/BookingContext';
import { BookingService } from '../services/BookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingSummary({ movie }) {
  const { selected, clearSeats } = useContext(BookingContext);
  const [form, setForm] = useState({ email: '', phone: '', name: '' });
  const [loading, setLoading] = useState(false);

  const price = 8;
  const total = selected.length * price;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await BookingService.saveBooking(movie.id, selected, form);
      toast.success(`Успішно заброньовано ${selected.length} місце/місць!`);
      clearSeats();
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Не вдалося зберегти бронювання');
      setLoading(false);
    }
  };

  return (
    <form className="booking-summary" onSubmit={handleSubmit}>
      <div className="summary-info">
        <h3>{movie.title}</h3>
        <p>Місця: {selected.map(s => `${s.row}-${s.num}`).join(', ')}</p>
        <p>Вартість: {total} $</p>
      </div>
      <div className="summary-form">
        <label>
          Повне ім’я
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Телефон
          <input
            type="tel"
            required
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label>
          Електронна скринька
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <button type="submit" className="btn-next btn-data" disabled={loading}>
          {loading ? 'Зберігаємо...' : 'Підтвердити бронювання'}
        </button>
      </div>
    </form>
  );
}
