import React from 'react';
import CardFilm from './CardFilm';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MovieIsPlay.css';

function MovieIsPlay({ movieList }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className="MoviePlay">
      <h2>Phim đang chiếu</h2>
      <Slider {...settings}>
        {movieList.map((item, index) => {
          return (
            <CardFilm
              key={item._id}
              movieId={item._id}
              poster={item.avatar}
              movieName={item.nameFilm}
              category={item.category}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default MovieIsPlay;
