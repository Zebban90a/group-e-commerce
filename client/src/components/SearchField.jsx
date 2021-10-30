import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledSearchField = styled.div`
  width: 300px;
  position: relative;
  
  ul {
    position: absolute;
    margin: 0;
    background-color: grey;
    padding-left: 0;
  }
`;

const StyledListItem = styled.li`
  width: 100%;
  list-style-type: none;
  margin-right: 15px;

  p {
    margin-left: 15px;
  }
  &:hover {
    background-color: white;
  }
  a {
    display: block;
    width: 100%;
    display: flex;
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export default function SearchField() {
  const [products, setProducts] = useState([]);
  let searchTimer = null;

  async function searchProducts(value) {
    if (value.length < 2) {
      setProducts([]);
      return;
    }

    const path = `https://group-e-commerce.herokuapp.com/api/products?search=${value}`;
    const { data } = await axios.get(path);
    setProducts(data.data.products);
  }

  function handleOnChange(e) {
    const { value } = e.target;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => searchProducts(value), 350);
  }

  function clearSearch() {
    document.getElementById('search-field').value = '';
    setProducts([]);
  }

  function renderListItem(product) {
    const { _id, images, title } = product;
    return (
      // eslint-disable-next-line react/jsx-no-bind
      <StyledListItem key={_id} onClick={clearSearch}>
        <Link to={`/products/${_id}`}>
          <img src={`/${images[0]}`} alt={title} />
          <p>{title}</p>
        </Link>
      </StyledListItem>
    );
  }

  function resumeSearch(e) {
    const currentValue = e.target.value;
    if (currentValue) {
      searchProducts(currentValue);
    }
  }

  return (
    <StyledSearchField>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="search-field">Search product:</label>
      <input
        type="text"
        name="search-field"
        id="search-field"
        placeholder="Ex: Iphone 13 Pro"
        onChange={handleOnChange}
        onFocus={resumeSearch}
      />
      <ul className="search-result">
        {products && products.map((product) => renderListItem(product))}
      </ul>
    </StyledSearchField>
  );
}
