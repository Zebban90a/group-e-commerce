import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);


  async function submitHandler(e) {
    e.preventDefault();
    console.log(formData)
    //await axios.post('http://localhost:5000/api/products', formData)
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
    //const { data } = await axios.get('http://localhost:5000/products')
    const data = [
      {
        "_id": "61658cc1bd37fef18bdaa40a"
      ,
      "title": "first product again",
      "description": "Lorem productum",
      "price": 3000,
      "category": "Comedy",
      "created_at": {
          "$date": "2021-10-12T13:18:45.459Z"
      },
      "images": ["https://picsum.photos/id/237/200/300"],
      "quantity": 0,
      "manufacturer": "Flen",
      "weight": 25,
      "__v": 0
      }, 
      {
        "_id": "61658a1c2e620ab1b18dd34a"
      ,
      "title": "samsung random tv",
      "description": "some description",
      "price": "400",
      "category": "TV",
      "created_at": {
          "$date": "2021-10-12T13:17:09.000Z"
      },
      "images": ["some url"],
      "quantity": "10",
      "manufacturer": "samsung",
      "weight": "3000"
      },
      {
        "_id":  "61658a1c2e620ab1b18dd345"
      ,
      "title": "samsung random tv2",
      "description": "some description",
      "price": "400",
      "category": "TV",
      "created_at": {
          "$date": "2021-10-12T13:17:09.000Z"
      },
      "images": ["some url"],
      "quantity": "10",
      "manufacturer": "samsung",
      "weight": "3000"
      }
      
    ]
    setProducts(data)
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
          value={formData.title}
          onChange={onChangeHandler}
          required
        /> <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={onChangeHandler}
          required
        /> 
        <br />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={onChangeHandler}
          required
        />
        <br />
        <label htmlFor="images">Images</label>
        <input
          type="file"
          name="images"
          value={formData.images}
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
