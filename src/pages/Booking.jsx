import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { movies } from '../data/movies';
import CinemaHall from '../components/CinemaHall';
import BookingSummary from '../components/BookingSummary';
import { BookingService } from '../services/BookingService';

export default function Booking() {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === +movieId);
  const [step, setStep] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Якщо фільм не знайдено — повідомлення і редірект
  useEffect(() => {
    if (!movie) {
      toast.dismiss();
      toast.error('Фільм не знайдено');
    }
  }, [movie]);

  // Завантаження місць
  const fetchSeats = async () => {
    try {
      const seats = await BookingService.getBookedSeats(movieId);
      setBookedSeats(seats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (movie) {
      fetchSeats(); // перше завантаження
      const interval = setInterval(fetchSeats, 5000); // полінг
      return () => clearInterval(interval); // очистка
    }
  }, [movieId, movie]);

  // Редірект на NotFound, якщо немає такого фільму
  if (!movie) return <Navigate to="/not-found" replace />;

  return (
    <div className="booking-page">
      <header className="booking-header">
        <Link to="/" className="step-link">Головна</Link>
        <span className={`step ${step === 1 ? 'active' : ''}`}>Сеанс</span>
        <span className={`step ${step === 2 ? 'active' : ''}`}>Місце</span>
        <span className={`step ${step === 3 ? 'active' : ''}`}>Дані</span>
      </header>

      <div className="booking-content">
        {step === 1 && (
          <div className="session-step">
            <h2>{movie.title}</h2>
            <p>Дата: {new Date(movie.time).toLocaleString()}</p>
            <p>Формат: 2D</p>
            <p>Зала: Головна зала</p>
            <button className="btn-next" onClick={() => setStep(2)}>
              Обрати місце
            </button>
          </div>
        )}

        {step === 2 && (
          <CinemaHall
            rows={8}
            cols={12}
            bookedSeats={bookedSeats}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <BookingSummary movie={movie} />
        )}
      </div>
    </div>
  );
}

