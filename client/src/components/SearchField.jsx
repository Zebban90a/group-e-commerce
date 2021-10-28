import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledListItem = styled.ul`
  a {
    display: block;
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`

export default function SearchField() {
  const [products, setProducts] = useState([]);
  let searchTimer = null;
  
  function handleOnChange(e) {
    const value = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => searchProducts(value), 350);
  }

  async function searchProducts(value) {
    if (value.length < 2) {
      setProducts([]);
      return;
    };
    
    const path = `/api/products?search=${value}`;
    const { data } = await axios.get(path);
    setProducts(data.data.products);
  }

  function renderListItem(product) {
    const { _id, images, title, price } = product;
    return (
      <StyledListItem key={_id}>
        <Link to={`/products/${_id}`}>
          <img src={`/${images[0]}`} alt="product image"/>
          <p>{title}</p>
          <p>{'$'+price}</p>
        </Link>
      </StyledListItem>
    )
  }

  return (
    <div>
      <label htmlFor="search">Search product:</label>
      <input type="text" name="search" id="search" placeholder="Ex: Iphone 13 Pro" onChange={handleOnChange}/>
      <ul>
        {products && products.map(product => {
          return renderListItem(product)
        })}
      </ul>
    </div>
  )
}
