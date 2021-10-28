import React, {useState, useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function OrderProductDetails({ cartItem }) {
  const [productData, setProductData] = useState('')
  
  const getProduct = async () => {
    const path = `/api/products/${cartItem.id}`;
    const { data } = await axios.get(path);
    setProductData(data.data.product)
  }

  useEffect(() => {
    getProduct()
  }, [])
  return (
    productData && (
      <Wrapper>
      <p>
        {productData.title}
      </p>
      <p>
       Amount: {cartItem.quantity}
      </p>
      <p>
        Price each: &#36;
        {productData.price}
      </p>
    </Wrapper>
    )
  );
}
