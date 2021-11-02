import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from '../components/Orders';
import DynamicForm from '../components/DynamicForm';
import UserContext from '../contexts/UserContext';
import { userForm } from '../data/formFormats';

export default function UserPage() {
  const [formData, setFormData] = useState({});
  const [orders, setOrders] = useState([]);
  const [editUserData, setEditUserData] = useState(false);

  async function getUser() {
    const path = 'https://group-e-commerce.herokuapp.com/api/users';
    const { data } = await axios.get(path);
    const userData = data.data.user;

    const { fullName, email } = userData;
    const {
      street, houseNumber, city, zip,
    } = userData.contactInfo ? userData.contactInfo.address : {};
    const { tel } = userData.contactInfo || '';

    setFormData({
      fullName,
      email,
      tel,
      street,
      houseNumber,
      city,
      zip,
    });
  }

  const submitUserData = async () => {
    const path = 'https://group-e-commerce.herokuapp.com/api/users';
    await axios.patch(path, formData);
  };

  async function getAllOrders() {
    const path = 'https://group-e-commerce.herokuapp.com/api/orders';
    const { data } = await axios.get(path);
    setOrders(data.data.orders);
  }

  const handleToggleUserDataForm = () => {
    setEditUserData((prevState) => !prevState);
  };

  useEffect(() => {
    getUser();
    getAllOrders();
  }, []);

  return (
    <div>
      {!editUserData
        && (
          <div>
            <div>
              <h2>User details</h2>
              <p>{formData.fullName}</p>
              <p>{formData.email}</p>
            </div>
            {formData
              && (
                <div>
                  <h2>Contact information</h2>
                  <p>
                    Street:
                    {' '}
                    {formData.street}
                  </p>
                  <p>
                    House#:
                    {' '}
                    {formData.houseNumber}
                  </p>
                  <p>
                    Zip:
                    {' '}
                    {formData.zip}
                  </p>
                  <p>
                    City:
                    {' '}
                    {formData.city}
                  </p>
                  <p>
                    Phone#:
                    {' '}
                    {formData.tel}
                  </p>
                </div>
              )}
          </div>
        )}
      {editUserData
        && (
          <UserContext.Provider value={{ formData, setFormData }}>
            <DynamicForm
              submitHandler={submitUserData}
              formFormat={userForm}
            />
          </UserContext.Provider>
        )}
      <button type="button" onClick={handleToggleUserDataForm}>
        {editUserData ? 'Cancel' : 'Edit Details'}
      </button>
      {orders && <Orders orders={orders} />}
    </div>
  );
}
