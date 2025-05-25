// src/components/MovieList.jsx
import React, { useState } from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [genre, setGenre] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const toggleFilter = () => setFilterOpen(prev => !prev);

  const allGenres = Array.from(new Set(movies.map(m => m.genre))).sort();

  const filtered = movies.filter(m => {
    const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre ? m.genre === genre : true;
    const movieDate = new Date(m.time);
    const matchesFrom = fromDate ? movieDate >= new Date(fromDate) : true;
    const matchesTo = toDate ? movieDate <= new Date(toDate) : true;
    return matchesQuery && matchesGenre && matchesFrom && matchesTo;
  });

  const now = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(now.getDate() + 7);

  const currentMovies = filtered.filter(m => new Date(m.time) <= weekFromNow);
  const upcomingMovies = filtered.filter(m => new Date(m.time) > weekFromNow);

  return (
    <>
      <div className="search-bar-with-filter">
        <input
          className="search-input"
          type="text"
          placeholder="Пошук фільму..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="filter-toggle" onClick={toggleFilter}>
         <img src="/icons/filter-gothic.svg" alt="Фільтр" />
        </button>
      </div>

      {filterOpen && (
        <div className="filter-menu gothic-style">
          <label>
            Жанр: 
            <select value={genre} onChange={e => setGenre(e.target.value)}>
              <option value="">Усі</option>
              {allGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </label>
          <label>
            Від:
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </label>
          <label>
            До:
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
          </label>
        </div>
      )}

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
                  <MovieCard {...movie} meta={meta} />
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
                  <MovieCard {...movie} meta={meta} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}