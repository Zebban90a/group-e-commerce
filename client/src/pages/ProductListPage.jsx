import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styled from 'styled-components';

const CardGrid = styled.div`
    width: 100%;
    max-width: 1350px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    
    @media (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    };
    @media (max-width: 750px) {
      grid-template-columns: repeat(2, 1fr);
    };
    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
    };
`

export default function ProductListPage() {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    const { data } = await axios.get('http://localhost:5000/api/products')
    console.log(data.data.products);
    setProducts(data.data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <h1>Product list</h1>
      <CardGrid>
        {
          products ?
            products.map(product => {
              return <ProductCard product={product} key={product._id}/>
            })
            :(<p>Loading...</p>)
        }
      </CardGrid>
    </div>
  );
}
