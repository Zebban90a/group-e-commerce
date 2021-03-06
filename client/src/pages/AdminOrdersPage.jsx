import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Orders from '../components/Orders';
axios.defaults.withCredentials = true;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    const path = 'https://group-e-commerce.herokuapp.com/api/orders';
    const { data } = await axios.get(path);
    setOrders(data.data.orders);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <h1>admin orders</h1>
      {orders
      && <Orders orders={orders} admin />}
    </div>
  );
}
