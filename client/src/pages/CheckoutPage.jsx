import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CheckoutPage() {
  const mockUserId = '616fdfbc1576abbb9e174e03';

  fetch(`http://localhost:5000/api/checkout/${mockUserId}`)
    .then((response) => response.json())
    .then((user) => console.log(user));
  
  // async function getProducts() {
    


  //   // console.log(payload);
  //   // const data = await axios({
  //   //   url: `http://localhost:5000/api/checkout/${mockUserId}`,
  //   //   method: 'GET',
  //   // });
  //   // console.log(data);
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);
  return (
    <div>
      <h1>Checkout page</h1>
    </div>
  );
}
