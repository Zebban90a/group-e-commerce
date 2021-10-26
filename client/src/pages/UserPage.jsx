import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from '../components/Orders';

export default function UserPage() {
  /* const testOrders = [{
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
  }]; */

  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [editUserData, setEditUserData] = useState(false);

  async function getUser() {
    const path = '/api/users';
    const { data } = await axios.get(path);
    setUserData(data.data.user);
  }

  const submitUserData = async () => {
    const path = '/api/users';
    await axios.patch(path, userData);
  }

  // Uncomment after merge with cart...
  async function getAllOrders() {
    const path = '/api/orders';
    const { data } = await axios.get(path);
    const logData = async () => {
      console.log(data.data.orders);
    }
    await logData();
    setOrders(data.data.orders);
  }

  const handleToggleUserDataForm = () => {
    setEditUserData((prevState) => !prevState);
  }

  useEffect(() => {
    getUser();
    getAllOrders();
    console.log('useEffect getting users');
  }, []);

 /*  // Uncomment after merge with cart...
  useEffect(() => {
    console.log('useEffect getting orders');
  }, []); */

  // TODO fix styling, make components
  return (
    <div>
      {!editUserData &&
        <div>
          <div>
            <h2>User details</h2>
            <p>{userData.fullName}</p>
            <p>{userData.email}</p>
          </div>
          {userData.contactInfo &&
            <div>
              <h2>Contact information</h2>
              <p>Street: {userData.contactInfo.address.street}</p>
              <p>House#: {userData.contactInfo.address.houseNumber}</p>
              <p>City: {userData.contactInfo.address.city}</p>
              <p>Phone#: {userData.contactInfo.tel}</p>
            </div>
          }
        </div>
      }
      {
        // Replace with Dino's Dynamic Design Form™
        editUserData &&
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button>Save</button>
        </form>
      }
      <button type="button" onClick={handleToggleUserDataForm}>
        {editUserData ? 'Cancel' : 'Edit Details'}
      </button>
      {orders && <Orders orders={orders} />}
    </div>
  );
}
