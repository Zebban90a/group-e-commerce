import React, { useState, useEffect } from 'react';
import Orders from '../components/Orders';
import axios from 'axios';

export default function AdminOrdersPage() {
  const testOrders = [{
    _id: '616593c4e9eb5c2a271c6b38',
    purchaser: '616584cf8b04b9069807c7ae',
    products: [
      {
        productId: '616c307bef6a325dbe86adbd',
        quantity: 1,
        productPrice: 400,
      },
      {
        productId: '6172faf153a931bc372bba2a',
        quantity: 111,
        productPrice: 1230,
      },
    ],
    orderTotal: 400,
    freight: 20,
    status: 0,
    address: {
      zip: 12345,
      city: 'Gotham',
      street: 'Waynestreet',
      houseNumber: 10,
    },
    contact: {
      tel: 555555123,
      email: 'kweku@gmail.com',
      _id: '616593c4e9eb5c2a271c6b3a',
    },
  },
  {
    _id: '616593c4e9eb5c2a271c6123',
    purchaser: '616584cf8b04b9069807c7ae',
    products: [
      {
        productId: '616c32b3ab80ba326d0efe5d',
        quantity: 12,
        productPrice: 440,
      },
      {
        productId: '6172b9afa023bf2e1e972251',
        quantity: 12,
        productPrice: 4300,
      },
    ],
    orderTotal: 400,
    freight: 20,
    status: 0,
    address: {
      zip: 12345,
      city: 'Gotham',
      street: 'Waynestreet',
      houseNumber: 10,
    },
    contact: {
      tel: 555555123,
      email: 'kweku@gmail.com',
      _id: '616593c4e9eb5c2a271c6b3a',
    },
  }];
  const [orders, setOrders] = useState(testOrders);
  
  /* async function getAllOrders() {
    const path = '/api/orders';
    const { data } = await axios.get(path);
    setOrders(data.data.order);
   }*/

   /* useEffect(() => {
    console.log('useEffect getting orders');
    getAllOrders();
  }, []); */

  return (
    <div>
      <h1>admin orders</h1>
      <Orders orders={orders} />
    </div>
  );
}
