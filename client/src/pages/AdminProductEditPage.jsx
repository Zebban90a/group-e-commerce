import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';
import { UserContext } from '../contexts/UserContext';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState('');

  const productForm = [
    {
      name: 'title',
      required: false,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'description',
      required: false,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'price',
      required: false,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    {
      name: 'category',
      required: false,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'quantity',
      required: false,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    {
      name: 'manufacturer',
      required: false,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'weight',
      required: false,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    {
      name: 'images',
      required: false,
      regexRule: null,
      type: 'file',
      prompt: null
    }
  ];
  
  async function getProduct() {
    const path = `http://localhost:5000/api/products/${id}`;
    const { data } = await axios.get(path);
    const { product } = data.data;
    
    setFormData({
      category: product.category,
      description: product.description,
      manufacturer: product.manufacturer,
      price: product.price,
      quantity: product.quantity,
      title: product.title,
      weight: product.weight
    })
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const path = `http://localhost:5000/api/products/${id}`;
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

  function imageHandler(e) {
    setFormImage({ file: e.target.files[0] });
  }
  return (
    <div>
      <UserContext.Provider value={{formData, setFormData}}>
        <DynamicForm
          submitHandler={submitHandler}
          imageHandler={imageHandler}
          formFormat={productForm}
          defaultRequired={false}
        />
      </UserContext.Provider>
    </div>
  );
}
