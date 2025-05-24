import React from 'react';
import '../index.css';

export default function MovieCard({ movie }) {
  return (
    <li className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="content">
        <h2 className="title">{movie.title}</h2>
        <p className="desc">{movie.description}</p>
        <p className="meta">
          {movie.genre} — {new Date(movie.showtime).toLocaleString()}
        </p>
      </div>
    </li>
  );
}