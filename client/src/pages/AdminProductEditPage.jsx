import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';
import { UserContext } from '../contexts/UserContext';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState({});
  const [formImage, setFormImage] = useState('');

  const requirements = [
    {
      name: 'title',
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'description',
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'price',
      required: true,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    {
      name: 'category',
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'quantity',
      required: true,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    {
      name: 'manufacturer',
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    {
      name: 'weight',
      required: true,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    {
      name: 'images',
      required: true,
      regexRule: null,
      type: 'file',
      prompt: null
    }
  ];
  
  async function getProduct() {
    const path = `http://localhost:5000/api/products/${id}`;
    const { data } = await axios.get(path);
    const { product } = data.data;
    setProductData(product);
    
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
    console.log('hej');
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
          requirements={requirements}
        />
      </UserContext.Provider>
    </div>
  );
}
