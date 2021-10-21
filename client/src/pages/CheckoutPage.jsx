import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CheckoutPage() {
  const mockUserId = '616fdfbc1576abbb9e174e03';
  const [cart, setCart] = useState({});

  
  
  // async function getProducts() {
    


  //   // console.log(payload);
  //   // const data = await axios({
  //   //   url: `http://localhost:5000/api/checkout/${mockUserId}`,
  //   //   method: 'GET',
  //   // });
  //   // console.log(data);
  // }

  useEffect(() => {
    fetch(`http://localhost:5000/api/checkout/${mockUserId}`)
    .then((response) => response.json())
    .then((user) => setCart(user));
    console.log(cart);
  }, []);
  return (
    <div>
      <h1>Checkout page</h1>

    </div>
  );
}
