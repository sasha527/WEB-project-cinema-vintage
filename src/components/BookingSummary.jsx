import React, { useContext, useState } from 'react';
import { BookingContext } from '../pages/BookingContext';
import { BookingService } from '../services/BookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingSummary({ movie }) {
  const { selected, clearSeats, toggleSeat } = useContext(BookingContext);
  const [form, setForm] = useState({ email: '', phone: '', name: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const price = 8;
  const total = selected.length * price;

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]{2,50}$/.test(form.name)) {
      newErrors.name = 'Введіть коректне ім’я (2-50 літер, без цифр)';
    }

    if (!/^\+?[0-9\s\-]{7,20}$/.test(form.phone)) {
      newErrors.phone = 'Введіть коректний номер телефону';
    }

    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
      newErrors.email = 'Введіть коректну електронну адресу';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (selected.length === 0) {
      toast.error('Оберіть місце для бронювання');
      return;
    }

    if (!validate()) return;
    setLoading(true);

    try {
      const seatToBook = selected[0];
      await BookingService.saveBooking(movie.id, [seatToBook], form);
      toast.success(`Успішно заброньовано місце: ряд ${seatToBook.row}, місце ${seatToBook.num}`);

      toggleSeat(seatToBook);
      setForm({ email: '', phone: '', name: '' });
    } catch (err) {
      console.error(err);
      toast.error('Не вдалося зберегти бронювання');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="booking-summary" onSubmit={handleSubmit}>
      <div className="summary-info">
        <h3>{movie.title}</h3>
        <p>Обрано місць: {selected.length > 0 ? selected.length : '0'}</p>
        <p>Вартість: {selected.length * price} $</p>
      </div>

      <div className="summary-form">
        <label>
          Повне ім’я
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          {errors.name && <small className="form-error">{errors.name}</small>}
        </label>

        <label>
          Телефон
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />
          {errors.phone && <small className="form-error">{errors.phone}</small>}
        </label>

        <label>
          Електронна скринька
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          {errors.email && <small className="form-error">{errors.email}</small>}
        </label>

        <button type="submit" className="btn-next btn-data" disabled={loading}>
          {loading ? 'Зберігаємо...' : 'Підтвердити бронювання'}
        </button>
      </div>
    </form>
  );
}
