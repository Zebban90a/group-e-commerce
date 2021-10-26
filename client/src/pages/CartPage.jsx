import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/api/cart')
      .then((response) => response.json())
      .then((user) => setCart(user.data.user.cart));
  }, []);

  return (
    <div>
      <h1>CART</h1>
      {cart.map((product) => (
        <div>
          <span>
            <span>{`Produkt: ${product.title || 'no name'}`}</span>
            <br />
            <span>{`Pris: ${product.price} kr`}</span>
          </span>
        </div>
      ))}
      <br />
      <Link to="/checkout"><h3>Go to Checkout</h3></Link>
    </div>

  );
}
