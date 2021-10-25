import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState(null);

  async function getUser() {
    const path = '/api/users';
    const { data } = await axios.get(path);
    setUserData(data.data.user);
  }
  async function getAllOrders() {
    const path = '/api/orders';
    const { data } = await axios.get(path);
    setUserData(data.data.order);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        <p>{userData.fullName}</p>
        <p>{userData.email}</p>
      </div>

      {orders
        && (
        <div>
          <table>
            <thead>
              <th>
                Order ID:
              </th>
              <th>
                Order total:
              </th>
              <th>
                Status:
              </th>
              <th>
                Products:
              </th>
            </thead>
            <tbody>
              {orders.map((order) => {
                <tr>
                  <td>{order._id}</td>
                  <td>{order.orderTotal}</td>
                  <td>{order.status}</td>
                  <td>{order.products}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        )}

    </div>
  );
}
