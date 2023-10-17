import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import './FilmDetail.css';

function FilmDetail({ movieId, setIsLoading, setError }) {
  const [movie, setMovie] = useState({});

  const fetchMovie = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/movie/${movieId}`,
    })
      .then((res) => {
        setMovie(res.data.movie);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="film-container">
      <div className="poster-film">
        <img src={movie.avatar} alt="" />
        <div className="icon-play">
          <img
            src="https://cdn-icons.flaticon.com/png/128/527/premium/527995.png?token=exp=1647531332~hmac=71bb26687e8d612ce5c2f34d394a51b3"
            alt=""
          />
        </div>
      </div>
      <div className="detail-film">
        <img src={movie.background} alt="" />
        <div className="detail">
          <h2>{movie.nameFilm}</h2>
          <Link to={`/booking/${movieId}`}>
            <p>Đặt vé</p>
          </Link>
          <div className="content-film">
            <div className="content-film-1">
              <p>
                Đạo diễn: <span>{movie.director}</span>
              </p>
              <p>
                Thời lượng: <span>{'90 phút'}</span>
              </p>
              <p>
                Phát hành:{' '}
                <span>
                  {new Date(movie.movieDay).toLocaleString().split(',')[0]}
                </span>
              </p>
              <p>
                Thể loại: <span>{movie.category}</span>
              </p>
              <p>
                Quốc gia: <span>{movie.country}</span>
              </p>
            </div>
            <div className="content-film-2">
              <h3>Nội dung</h3>
              <p>{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;
