import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';

const CardGrid = styled.div`
    width: 100%;
    max-width: 1350px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
    
    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    };
    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    };
    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    };
`;

export default function ProductListPagecategory() {
  
  const [products, setProducts] = useState(null);
  let path = 'cat'
  async function getProducts() {
    console.log(query.get('category'))
    const { data } = await axios.get(`http://localhost:5000/api/products${query.get("category")}`);
    setProducts(data.data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Product list</h1>
      <CardGrid>
        {
          products
            ? products.map((product) => <ProductCard product={product} key={product._id} />)
            : (<p>Loading...</p>)
        }
      </CardGrid>
    </div>
  );
}
