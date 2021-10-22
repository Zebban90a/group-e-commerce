import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm';
import { UserContext } from '../contexts/UserContext';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState([]);
  const [formData, setFormData] = useState('');
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

  async function submitHandler(e) {
    e.preventDefault();
    const deployForm = new FormData(); // formdata object

    deployForm.append('input', JSON.stringify(deployForm));
    deployForm.append('image', formImage.file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };
    const path = 'http://localhost:5000/api/products';
    const res = await axios.post(path, deployForm, config);
    if (res && res.status === 201) {
      getProducts();
    }
  }

  function imageHandler(e) {
    setFormImage({ file: e.target.files[0] });
  }

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`);
    window.location.reload();
  };

  const getProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    const { products } = data.data;
    setProductList(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>admin products</h1>
      
      <UserContext.Provider value={{formData, setFormData}}>
        <DynamicForm
          submitHandler={submitHandler}
          imageHandler={imageHandler}
          requirements={requirements}
        />
      </UserContext.Provider>

      {productList.map((product) => {
        const id = product._id;
        return (
          <li key={id}>
            <Link to={`/Admin/products/${id}`}>{product.title}</Link>
            <button type="button" onClick={() => deleteProduct(id)}>DELETE</button>
          </li>
        );
      })}
    </div>
  );
}
