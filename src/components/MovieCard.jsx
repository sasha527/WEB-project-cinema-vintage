// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ id, poster, title, desc, meta }) {
  return (
    <div
      className="movie-card"
      style={{ backgroundImage: `url(${poster})` }}
    >
      <div className="movie-info">
        <h4 className="movie-title">{title}</h4>
        <p className="movie-desc">{desc}</p>
        <div className="movie-meta">{meta}</div>

        {/* Кнопка бронювання */}
        <Link to={`/booking/${id}`} className="btn-book">
          Забронювати
        </Link>
      </div>
    </div>
  );
}
