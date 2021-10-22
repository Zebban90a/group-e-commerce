import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CartPage() {
  
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    fetch('/api/cart')
      .then((response) => response.json())
      .then((user) => setCart(user.data.user.cart));
  }, []);
  console.log(cart);

  return (
    <div>
      <h1>CART</h1>
      {cart.map((product) => (
        <div>
          <span>
            <span>{`Produkt: ${product.Title || 'no name'}`}</span>
            <br />
            <span>{`Pris: ${product.Price} kr`}</span>
          </span>
        </div>
      ))}
      <br />
      <button>Go to Checkout</button>
    </div>

  );
}
