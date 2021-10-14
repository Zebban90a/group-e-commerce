import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);


  async function submitHandler(e) {
    e.preventDefault();
    console.log(formData)
    await axios.post('http://localhost:5000/api/products', formData)
  }

  function onChangeHandler(e) {
    const inputName = e.target.name;
		const inputValue = e.target.value;
    setFormData({...formData, 
      [inputName]: inputValue}) 
  }

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
      <form
        encType="multipart/form-data"
        onSubmit={submitHandler}
        id="form"
      > 
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={onChangeHandler}
          required
        /> <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description || ""}
          onChange={onChangeHandler}
          required
        /> 
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category || ""}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity || ""}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer || ""}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          name="weight"
          value={formData.weight || ""}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="images">Images</label>
        <input
          type="file"
          name="images"
          value={formData.images || ""}
          onChange={onChangeHandler}
          required
        />
        <br />
        <br />

        <button type="submit">Submit</button>
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
