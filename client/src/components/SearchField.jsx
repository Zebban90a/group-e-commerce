import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function SearchField() {
  const [products, setProducts] = useState(null);
  let searchTimer = null;
  
  function handleOnChange(e) {
    const value = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => searchProducts(value), 350);
  }

  async function searchProducts(value) {
    if (value.length < 2) return;
    
    const path = `api/products?search=${value}`;
    const { data } = await axios.get(path);
    setProducts(data.data.products);
  }

  function renderListItem() {
    return (
      <li></li>
    )
  }

  return (
    <div>
      <label htmlFor="search">Search product:</label>
      <input type="text" name="search" id="search" placeholder="Ex: Iphone 13 Pro" onChange={handleOnChange}/>
      <ul>
        {products && 'hej'}
      </ul>
    </div>
  )
}
