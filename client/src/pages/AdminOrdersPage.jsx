import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Orders from '../components/Orders';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    const path = '../api/orders';
    const { data } = await axios.get(path);
    console.log(data.data.orders[0].date);
    console.log(new Date(data.data.orders[0].date).getHours(),':',new Date(data.data.orders[0].date).getMinutes());
    console.log();
    setOrders(data.data.orders);
  }

  useEffect(() => {
    console.log('useEffect getting orders');
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
