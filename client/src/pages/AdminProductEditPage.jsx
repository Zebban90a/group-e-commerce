import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';
import UserContext from '../contexts/UserContext';
import { productForm } from '../data/formFormats';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState('');
  const history = useHistory();

  async function getProduct() {
    const path = `https://group-e-commerce.herokuapp.com/api/products/${id}`;
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
    const path = `https://group-e-commerce.herokuapp.com/api/products/${id}`;
    const formDataDeployment = new FormData();

    formDataDeployment.append('input', JSON.stringify(formData));
    formDataDeployment.append('image', formImage.file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.patch(path, formDataDeployment, config);
    if (res.status === 200) {
      history.push('/admin/products');
    }
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
