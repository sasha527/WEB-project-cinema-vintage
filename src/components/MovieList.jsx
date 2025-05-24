import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { movies } from '../data/movies';

export default function MovieList() {
  const [query, setQuery] = useState('');
  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук фільму..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
