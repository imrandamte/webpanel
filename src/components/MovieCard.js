import React from 'react';
import { Link } from 'react-router-dom';
import './Moviecard.css';


function MovieCard({ movie }) {
  const { id, title, poster_path } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div>
      <Link to={`/movie/${id}`}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
}

export default MovieCard;
