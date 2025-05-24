// src/App.jsx
import React from 'react';
import AboutCarousel from './components/AboutCarousel';
import MovieList from './components/MovieList';
import { movies } from './data/movies';

export default function App() {
  return (
    <>
      <header className="parallax-header">
        <div className="container header-content">
          <h1 className="logo">Cinema Vintage</h1>
          <p className="subtitle">Опера &amp; Кіно</p>
        </div>
      </header>

     {/* Про нас */}
     <AboutCarousel />

      <main className="catalog-section">
        <div className="container main-content">
          <h2 className="page-title">Каталог фільмів</h2>
          <MovieList movies={movies} />
        </div>
      </main>
    </>
  );
}