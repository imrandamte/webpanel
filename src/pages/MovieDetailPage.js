import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieDetailPage.css';
import { useParams } from 'react-router-dom';

function MovieDetailPage() {
    
    let {id}=useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      );
      setMovie(movieResponse.data);
    };

    const fetchMovieCast = async () => {
      const castResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
      );
      setCast(castResponse.data.cast.slice(0, 10)); // Fetch top 10 cast members
    };
    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-page">
      <div className="movie-detail">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="details">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
        </div>
      </div>
      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.cast_id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="cast-image"
              />
              <p><strong>{actor.name}</strong></p>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
