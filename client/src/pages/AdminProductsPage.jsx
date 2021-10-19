import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState([]);
  const [formInput, setFormInput] = useState('');
  const [formImage, setFormImage] = useState('');

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
    const res = await axios.post('http://localhost:5000/api/products', formData, config);
    if (res && res.status === 201) {
      getProducts();
    }
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
      {/* <form onSubmit={submitHandler} encType="multipart/form-data">
        <label htmlFor="title">title: </label>
        <input onChange={onChangeHandler} type="text" name="title" id="title" />
        <label htmlFor="description">description: </label>
        <input onChange={onChangeHandler} type="text" name="description" id="description" />
        <label htmlFor="price">price: </label>
        <input onChange={onChangeHandler} type="number" name="price" id="price" />
        <label htmlFor="category">category: </label>
        <input onChange={onChangeHandler} type="text" name="category" id="category" />
        <label htmlFor="quantity">quantity: </label>
        <input onChange={onChangeHandler} type="text" name="quantity" id="quantity" />
        <label htmlFor="manufacturer">manufacturer: </label>
        <input onChange={onChangeHandler} type="text" name="manufacturer" id="manufacturer" />
        <label htmlFor="weight">weight: </label>
        <input
          onChange={onChangeHandler}
          type="number"
          name="weight"
          id="weight"
        />
        <label htmlFor="images">image: </label>
        <input type="file" name="image" onChange={imageHandler} id="images" />
        <button type="submit">Submit</button>
      </form> */}

      <ProductForm
        submitHandler={submitHandler}
        onChangeHandler={onChangeHandler}
        imageHandler={imageHandler}
        formInput={formInput}
      />

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
