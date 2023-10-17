import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import FilmDetail from '../components/FilmDetail';
import MovieIsPlay from '../components/MovieIsPlay';
import BoxActor from '../components/BoxActor';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';

import axios from 'axios';

import './Movie.css';

const Movie = () => {
  const { movieId } = useParams();

  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [movieList, setMovieList] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie',
    })
      .then((res) => {
        if (res.data.films.length === 0) {
          setMovieList([]);
          setIsLoading(false);
          return;
        }
        setMovieList(res.data.films);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="movie-wrapper">
        <Navbar tab={2} />
        <FilmDetail
          movieId={movieId}
          setIsLoading={setIsLoading}
          setError={setError}
        />
        <MovieIsPlay movieList={movieList} />
        <BoxActor />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Movie;
