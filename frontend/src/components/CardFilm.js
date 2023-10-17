import React from 'react';

import { Link } from 'react-router-dom';

import './CardFilm.css';

function CardFilm({ movieId, poster, movieName, category }) {
  return (
    <div className="card-film">
      <div className="card-film-image">
        <img src={poster} alt="" />
        <Link to={`/movie/${movieId}`}>Chi tiết</Link>
      </div>
      <div className="card-film-content">
        <h3>{movieName}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
}

export default CardFilm;
