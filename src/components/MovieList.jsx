// src/components/MovieList.jsx
import React, {useState} from 'react';
import MovieCard from './MovieCard';

export default function MovieList({movies}) {
  const [ query, setQuery ] = useState('');
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
          <li key={movie.id}>
            <MovieCard
              poster={movie.poster}
              title={movie.title}
              desc={movie.desc}
              meta={movie.meta}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

