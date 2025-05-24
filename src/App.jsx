import React from 'react';
import MovieList from './components/MovieList';

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-vintageBeige">
      <h1 className="text-3xl font-serif text-vintageRed mb-6">
        Каталог фільмів
      </h1>
      <MovieList />
    </div>
  );
}
