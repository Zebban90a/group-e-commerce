import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();
    const dataArray = new FormData()
    dataArray.append('data', formData);
    dataArray.append('image', image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    await axios.post('http://localhost:5000/api/products', dataArray, config)
      .then((response) => {
        console.log(response);
        // successfully uploaded response
      })
      .catch((error) => {
        // error response
        console.log(error);
      });
  }

  function onChangeHandler(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData({
      ...formData,
      [inputName]: inputValue
    });
  }

  function imageHandler(e) {
    const fileName = e.target.name;
    const files = e.target.files[0];
    setImage(
      { [fileName]: files }
    );
  }

  let deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`);
    window.location.reload()
  }

  async function getProducts() {
    const { data } = await axios.get('http://localhost:5000/api/products');
    const products = data.data.products;
    setProducts(products);
  }

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <div>
      <h1>admin products</h1>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <label htmlFor="title">title: </label>
        <input onChange={onChangeHandler} type="text" name="title" />
        <label htmlFor="description">description: </label>
        <input onChange={onChangeHandler} type="text" name="description" />
        <label htmlFor="price">price: </label>
        <input onChange={onChangeHandler} type="number" name="price" />
        <label htmlFor="category">category: </label>
        <input onChange={onChangeHandler} type="text" name="category" />
        <label htmlFor="quantity">quantity: </label>
        <input onChange={onChangeHandler} type="text" name="quantity" />
        <label htmlFor="manufacturer">manufacturer: </label>
        <input onChange={onChangeHandler} type="text" name="manufacturer" />
        <label htmlFor="weight">weight: </label>
        <input onChange={onChangeHandler} type="number" name="weight" />
        <label htmlFor="images">Bild: </label>
        <input onChange={imageHandler} type="file" name="images" />
        <input type="submit" />
      </form>

      {products.map(product => {
        const id = product._id
        return (
          <li key={id}>
            <Link to={`/Admin/products/${id}`}>{product.title}</Link>
            <button onClick={() => deleteProduct(id)}>DELETE</button>
          </li>
        )
      }
      )}
    </div>
  );
}
