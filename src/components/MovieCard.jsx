// src/components/MovieCard.jsx
import React from 'react';

export default function MovieCard({ poster, title, desc, meta }) {
  return (
    <div
      className="movie-card"
      style={{ backgroundImage: `url(${poster})` }}
    >
      <div className="movie-info">
        <h4 className="movie-title">{title}</h4>
        <p className="movie-desc">{desc}</p>
        <div className="movie-meta">{meta}</div>
      </div>
    </div>
  );
}