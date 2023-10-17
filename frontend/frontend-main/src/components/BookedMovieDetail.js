import React from 'react';

import './BookedMovieDetail.css';

function BookedMovieDetail() {
  return (
    <>
      <div className="overlay"></div>
      <div className="booked-movie-wrapper">
        <div className="booked-movie-poster"></div>
        <div className="booked-movie-info">
          <div className="film-title">
            <div>
              <h3>Linh hồn trú ngụ</h3>
              <p>Kinh dị, tâm lý</p>
            </div>
          </div>
          <div className="detail-film-body">
            <p>
              Ngày : <span>08/03/2022</span>
            </p>
            <p>
              Thời gian : <span>13:40-17:00</span>
            </p>
            <p>
              Rạp chọn : <span>CGV Aeon Hà Đông</span>
            </p>
            <span>
              Tầng 3& 4 TTTM AEON MALL Hà Đông , Dương nội Hà Đông , Hà Nội
            </span>
            <p>
              Số vé : <span>3</span>
            </p>
            <p>
              Mã chỗ : <span>6C, 7C, 8C</span>
            </p>
            <p>
              Thành tiền : <span>150.000VND</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookedMovieDetail;
