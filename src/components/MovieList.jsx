// src/components/MovieList.jsx
import React, { useState } from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  const [query, setQuery] = useState('');
  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  const now = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(now.getDate() + 7);

  const currentMovies = filtered.filter(m => new Date(m.time) <= weekFromNow);
  const upcomingMovies = filtered.filter(m => new Date(m.time) > weekFromNow);

  return (
    <>
      <input
        className="search-input"
        type="text"
        placeholder="Пошук фільму..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {currentMovies.length > 0 && (
        <>
          <h2 className="section-heading">🎭 У прокаті зараз</h2>
          <ul className="movie-list">
            {currentMovies.map(movie => {
              const time = new Date(movie.time).toLocaleString('uk-UA', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              });
              const meta = `${movie.genre} • ${time}`;
              return (
                <li key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    poster={movie.poster}
                    title={movie.title}
                    desc={movie.desc}
                    meta={meta}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}

      {upcomingMovies.length > 0 && (
        <>
          <hr className="section-divider" />
          <h2 className="section-heading">🎟 Очікуються незабаром</h2>
          <ul className="movie-list">
            {upcomingMovies.map(movie => {
              const time = new Date(movie.time).toLocaleString('uk-UA', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
              });
              const meta = `${movie.genre} • ${time}`;
              return (
                <li key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    poster={movie.poster}
                    title={movie.title}
                    desc={movie.desc}
                    meta={meta}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
