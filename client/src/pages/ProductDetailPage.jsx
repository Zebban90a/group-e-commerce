import React, { useEffect, useState } from 'react';
import axios from 'axios';
import noImage from '../no-img.png';

export default function ProductDetailPage(props) {
  const [product, setProduct] = useState('');

  async function getProduct() {
    const { id } = props.match.params;
    console.log(id);
    const path = `/api/products/${id}`;
    const { data } = await axios.get(path);
    setProduct(data.data.product);

  // setProducts(data.data.products);
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <div>
        {!product && <p>Loading..</p>}
        {product &&
        <div> 
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>price: {product.price}</p>
        <img alt={product.title} src={product.images[0] || noImage} />
        </div>
        }
      </div>
      <h1>Product detailsss</h1>
    </div>
  );
}
