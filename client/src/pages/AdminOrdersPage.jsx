import React, { useState, useEffect } from 'react';
import Orders from '../components/Orders';
import axios from 'axios';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  
  async function getAllOrders() {
    const path = '/api/orders';
    const { data } = await axios.get(path);
    setOrders(data.data.orders);
   }

   useEffect(() => {
    console.log('useEffect getting orders');
    getAllOrders();
  }, []);

  return (
    <div>
      <h1>admin orders</h1>
      <Orders orders={orders} />
    </div>
  );
}
