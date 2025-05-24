import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { movies } from '../data/movies';
import '../index.css';

export default function MovieList() {
  const [query, setQuery] = useState('');
  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        className="search-input"
        type="text"
        placeholder="Пошук фільму..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul className="movie-list">
        {filtered.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
}
