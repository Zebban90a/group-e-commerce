import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  function getCart() {
    fetch('/api/cart')
      .then((response) => response.json())
      .then((user) => setCart(user.data.user.cart));
  }
  useEffect(() => {
    getCart();
  }, []);

  function removeProduct(e, id) {
    e.preventDefault();
    console.log(id);
    const payload = {

      productId: id,
    };
    axios({
      url: '/api/cart',
      method: 'DELETE',
      data: payload,
    });

    getCart();
  }

  return (
    <div>
      <h1>CART</h1>
      {cart.map((product) => (

        <div>
          <span>
            <span>{`Produkt: ${product.title || 'no name'}`}</span>
            <br />
            <span>{`Pris: ${product.price} kr`}</span>
            <button onClick={e => removeProduct(e, product._id)}>X</button>

          </span>
        </div>
      ))}
      <br />
      <Link to="/checkout"><h3>Go to Checkout</h3></Link>
    </div>

  );
}
