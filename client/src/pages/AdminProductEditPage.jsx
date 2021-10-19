import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const [formInput, setFormInput] = useState('');
  const [productData, setProductData] = useState({});
  const [formImage, setFormImage] = useState('');

  async function getProduct() {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    const { product } = data.data;
    setProductData(product);
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(); // formdata object

    formData.append('input', JSON.stringify(formInput));
    formData.append('image', formImage.file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    await axios.patch(`http://localhost:5000/api/products/${id}`, formData, config);
  }

  function onChangeHandler(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormInput({
      ...formInput,
      [inputName]: inputValue,
    });
  }

  function imageHandler(e) {
    setFormImage({ file: e.target.files[0] });
  }
  return (
    <div>
      <ProductForm
        submitHandler={submitHandler}
        onChangeHandler={onChangeHandler}
        imageHandler={imageHandler}
        data={productData}
      />
    </div>
  );
}
