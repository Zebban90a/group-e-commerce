import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from '../components/Orders';

export default function UserPage() {
  /* const testOrders = [{
    _id: '616593c4e9eb5c2a271c6b38',
    purchaser: '616584cf8b04b9069807c7ae',
    products: [
      {
        productId: '61658a1c2e620ab1b18dd34a',
        quantity: 1,
        productPrice: 400,
      },
      {
        productId: '6172faf153a931bc372bba2a',
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
  },
  {
    _id: '616593c4e9eb5c2a271c6123',
    purchaser: '616584cf8b04b9069807c7ae',
    products: [
      {
        productId: '61658a1c2e620ab1b18dd34a',
        quantity: 1,
        productPrice: 400,
      },
      {
        productId: '61658a1c2e620ab1b18dd123',
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
  }]; */

  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);

  async function getUser() {
    const path = '/api/users';
    const { data } = await axios.get(path);
    setUserData(data.data.user);
  }
  async function getAllOrders() {
    const path = '/api/orders';
    const { data } = await axios.get(path);
    setOrders(data.data.order);
  }

  useEffect(() => {
    getUser();
    console.log('useEffect getting users');
  }, []);

  useEffect(() => {
    console.log('useEffect getting orders');
    getAllOrders();
  }, []);

  // TODO fix styling, make components
  return (
    <div>
      <div>
        <p>{userData.fullName}</p>
        <p>{userData.email}</p>
      </div>
      {orders && <Orders orders={orders} />}
    </div>
  );
}
