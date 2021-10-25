import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState(testOrders);

  const testOrders = [{
    "_id": "616593c4e9eb5c2a271c6b38",
    "purchaser": "616584cf8b04b9069807c7ae",
    "products": [
      {
        "productId": "61658a1c2e620ab1b18dd34a",
        "quantity": 1,
        "productPrice": 400,
      },
      {
        "productId": "61658a1c2e620ab1b18dd123",
        "quantity": 12,
        "productPrice": 4300,
      }
    ],
    "orderTotal": 400,
    "freight": 20,
    "status": 0,
    "address": {
      "zip": 12345,
      "city": "Gotham",
      "street": "Waynestreet",
      "houseNumber": 10
    },
    "contact": {
      "tel": 555555123,
      "email": "kweku@gmail.com",
      "_id": "616593c4e9eb5c2a271c6b3a"
    }
  },
  {
    "_id": "616593c4e9eb5c2a271c6123",
    "purchaser": "616584cf8b04b9069807c7ae",
    "products": [
      {
        "productId": "61658a1c2e620ab1b18dd34a",
        "quantity": 1,
        "productPrice": 400,
      },
      {
        "productId": "61658a1c2e620ab1b18dd123",
        "quantity": 12,
        "productPrice": 4300,
      }
    ],
    "orderTotal": 400,
    "freight": 20,
    "status": 0,
    "address": {
      "zip": 12345,
      "city": "Gotham",
      "street": "Waynestreet",
      "houseNumber": 10
    },
    "contact": {
      "tel": 555555123,
      "email": "kweku@gmail.com",
      "_id": "616593c4e9eb5c2a271c6b3a"
    }
  },];

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
    console.log(orders);
  }, []);

  // TODO fix styling, make components
  return (
    <div>
      <div>
        <p>{userData.fullName}</p>
        <p>{userData.email}</p>
      </div>
      {orders
        && (
          <div style={{ border: '1px solid #000' }}>
            <table>
              <thead>
                <tr>
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
                </tr>
              </thead>
              <tbody >
                {orders.map((order) => {
                  return (
                    <tr key={order._id} >
                      <td>{order._id}</td>
                      <td>{order.orderTotal}</td>
                      <td>{order.status}</td>
                      {order.products.map(product => {
                        return (
                          <div>
                            <tr>
                              <th>product id</th>
                              <th>product quantity</th>
                              <th>product price</th>
                            </tr>
                            <tr>
                              <td>{product.productId}</td>
                              <td>{product.quantity}</td>
                              <td>{product.productPrice}</td>
                            </tr>
                          </div>
                        )
                      })
                      }
                    </tr>
                  )
                })}
              </tbody>
            </table >
          </div >
        )
      }

    </div >
  );
}
