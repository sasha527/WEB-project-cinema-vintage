import React, { useContext, useState } from 'react';
import { BookingContext } from '../pages/BookingContext';
import { BookingService } from '../services/BookingService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingSummary({ movie }) {
  const { selected, clearSeats, toggleSeat } = useContext(BookingContext);
  const [formList, setFormList] = useState(
    selected.map(() => ({ name: '', phone: '', email: '' }))
  );
  const [errorsList, setErrorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const price = 8;
  const total = selected.length * price;

  const validate = () => {
    const newErrors = [];
    let isValid = true;
    const phones = new Set();
    const emails = new Set();

    formList.forEach((form, index) => {
      const errors = {};

      if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\-\s]{2,50}$/.test(form.name)) {
        errors.name = 'Введіть коректне ім’я (2-50 літер, без цифр)';
        isValid = false;
      }

      if (!/^\+?[0-9\s\-]{7,20}$/.test(form.phone)) {
        errors.phone = 'Введіть коректний номер телефону';
        isValid = false;
      } else if (phones.has(form.phone)) {
        errors.phone = 'Номер телефону не може повторюватись';
        isValid = false;
      } else {
        phones.add(form.phone);
      }

      if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
        errors.email = 'Введіть коректну електронну адресу';
        isValid = false;
      } else if (emails.has(form.email)) {
        errors.email = 'Електронна адреса не може повторюватись';
        isValid = false;
      } else {
        emails.add(form.email);
      }

      newErrors.push(errors);
    });

    setErrorsList(newErrors);
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      for (let i = 0; i < selected.length; i++) {
        const seat = selected[i];
        const form = formList[i];

        await BookingService.saveBooking(movie.id, [seat], form);
        toast.success(`Місце ${seat.row}-${seat.num} заброньовано на ім'я ${form.name}`);
        toggleSeat(seat);
      }

      clearSeats();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Не вдалося зберегти бронювання');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (index, field, value) => {
    const updated = [...formList];
    updated[index][field] = value;
    setFormList(updated);
  };

  return (
    <form className="booking-summary" onSubmit={handleSubmit}>
      <div className="summary-info">
        <h3>{movie.title}</h3>
        <p>Обрано місць: {selected.length}</p>
        <p>Загальна вартість: {total} $</p>
      </div>

      <div className="summary-form">
        {selected.map((seat, index) => (
          <div key={index} className="seat-form-block">
            <h4>Місце {seat.row}-{seat.num}</h4>

            <label>
              Ім’я
              <input
                type="text"
                value={formList[index].name}
                onChange={e => updateForm(index, 'name', e.target.value)}
                required
              />
              {errorsList[index]?.name && <small className="form-error">{errorsList[index].name}</small>}
            </label>

            <label>
              Телефон
              <input
                type="tel"
                value={formList[index].phone}
                onChange={e => updateForm(index, 'phone', e.target.value)}
                required
              />
              {errorsList[index]?.phone && <small className="form-error">{errorsList[index].phone}</small>}
            </label>

            <label>
              Електронна пошта
              <input
                type="email"
                value={formList[index].email}
                onChange={e => updateForm(index, 'email', e.target.value)}
                required
              />
              {errorsList[index]?.email && <small className="form-error">{errorsList[index].email}</small>}
            </label>
          </div>
        ))}

        <button type="submit" className="btn-next btn-data" disabled={loading}>
          {loading ? 'Збереження...' : 'Підтвердити бронювання'}
        </button>
      </div>
    </form>
  );
}