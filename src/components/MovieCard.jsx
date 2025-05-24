import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <div className="border border-vintageGold rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition p-4 bg-white">
      <img 
        src={movie.poster}
        alt={movie.title}
        className="w-full h-60 object-cover mb-2"
      />
      <h2 className="text-xl font-serif text-vintageRed mb-1">{movie.title}</h2>
      <p className="text-sm text-gray-700 mb-2">{movie.description}</p>
      <p className="italic text-xs text-gray-600">
        {movie.genre} — {new Date(movie.showtime).toLocaleString()}
      </p>
    </div>
  );
}
