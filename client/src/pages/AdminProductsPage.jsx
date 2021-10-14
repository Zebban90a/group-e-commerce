import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  /*async function submitHandler(e) {
    e.preventDefault();
    console.log(formData)
    await axios.post('http://localhost:5000/api/products', formData[0])
  } */

  /*function onChangeHandler(e) {
    const inputName = e.target.name;
		const inputValue = e.target.files;
    setFormData({...formData, 
      [inputName]: inputValue}) 
  } */

  let deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
    window.location.reload()
  }

  async function getProducts() {
    const { data } = await axios.get('http://localhost:5000/api/products')
    const products = data.data.products;
    setProducts(products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <h1>admin products</h1>
      <form action="http://localhost:5000/api/products" method="post" encType="multipart/form-data">
    <label htmlFor="title">title: </label> 
    <input type="text" name="title"/> 
    <label htmlFor="description">description: </label> 
    <input type="text" name="description"/> 
    <label htmlFor="price">price: </label> 
    <input type="number" name="price"/> 
    <label htmlFor="category">category: </label> 
    <input type="text" name="category"/> 
    <label htmlFor="quantity">quantity: </label> 
    <input type="text" name="quantity"/> 
    <label htmlFor="manufacturer">manufacturer: </label> 
    <input type="text" name="manufacturer"/> 
    <label htmlFor="weight">weight: </label> 
    <input type="number" name="weight"/> 
    <label htmlFor="images">Bild: </label> 
    <input type="file" name="images"/> 
    <input type="submit"/>
    </form>
      
      {products.map(product =>{
        const id = product._id
        return (
          <li key={id}>
            <Link to={`/Admin/products/${id}`}>{product.title}</Link> 
            <button onClick={() => deleteProduct(id)}>DELETE</button>
          </li>
        )}
      )}
    </div>
  );
}
