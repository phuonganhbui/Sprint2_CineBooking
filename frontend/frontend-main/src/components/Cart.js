import React from 'react';
import CartItem from './CartItem';
import './Cart.css';

function Cart({
  setChosenTicket,
  movieList,
  setIsLoading,
  setError,
  setModalIsShown,
}) {
  return (
    <div className="Cart-container">
      <h3>Các vé đã đặt: </h3>
      <div className="Cart">
        {movieList.map((movie) => (
          <CartItem
            setChosenTicket={setChosenTicket}
            movie={movie}
            setIsLoading={setIsLoading}
            setError={setError}
            setModalIsShown={setModalIsShown}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
