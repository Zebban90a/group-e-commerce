import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';
import UserContext from '../contexts/UserContext';
import { productForm } from '../data/formFormats';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState('');

  async function getProduct() {
    const path = `/api/products/${id}`;
    const { data } = await axios.get(path);
    const { product } = data.data;

    setFormData({
      category: product.category,
      description: product.description,
      manufacturer: product.manufacturer,
      price: product.price,
      quantity: product.quantity,
      title: product.title,
      weight: product.weight,
    });
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const path = `/api/products/${id}`;
    const formDataDeployment = new FormData();

    formDataDeployment.append('input', JSON.stringify(formData));
    formDataDeployment.append('image', formImage.file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await axios.patch(path, formDataDeployment, config);
  }

  return (
    <div>
      <UserContext.Provider value={{
        formData, setFormData, formImage, setFormImage,
      }}
      >
        <DynamicForm
          // eslint-disable-next-line react/jsx-no-bind
          submitHandler={submitHandler}
          formFormat={productForm}
        />
      </UserContext.Provider>
    </div>
  );
}
