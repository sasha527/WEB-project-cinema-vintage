// src/pages/Home.jsx
import React from 'react';
import AboutCarousel from '../components/AboutCarousel';
import MovieList from '../components/MovieList';
import { movies } from '../data/movies';

export default function Home() {
  return (
    <>
      <header className="opera-header">
        <div className="container header-content with-ornaments">
          <img
            src="/images/ornament.svg"
            alt="Орнамент лівий"
            className="ornament ornament-left"
          />

          <div className="title-block">
            <h1 className="logo">Cinema Vintage</h1>
            <p className="subtitle">Опера &amp; Кіно</p>
          </div>

          <img
            src="/images/ornament.svg"
            alt="Орнамент правий"
            className="ornament ornament-right"
          />
        </div>
      </header>

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

