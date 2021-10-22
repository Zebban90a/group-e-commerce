import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CartPage() {
  const mockUserId = '616fdfbc1576abbb9e174e03';
  const [cart, setCart] = useState([]);
  // console.log(req.user[0]._id);
  // async function getProducts() {

  //   // console.log(payload);
  //   // const data = await axios({
  //   //   url: `http://localhost:5000/api/checkout/${mockUserId}`,
  //   //   method: 'GET',
  //   // });
  //   // console.log(data);
  // }

  useEffect(() => {
    fetch(`http://localhost:5000/api/cart/${mockUserId}`)
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
