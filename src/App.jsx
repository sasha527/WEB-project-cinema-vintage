import React from 'react';
import MovieList from './components/MovieList';
import './index.css';

export default function App() {
  return (
    <div>
      <h1>Каталог фільмів</h1>
      <MovieList />
    </div>
  );
}