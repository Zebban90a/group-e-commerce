import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function OrderProductDetails({ orderProduct }) {
  const [productTitle, setProductTitle] = useState('');

  const getProductTitle = async () => {
    const id = orderProduct._id;
    const path = `/api/products/${id}`;
    const { data } = await axios.get(path);
    setProductTitle(data.data.product.title);
  };

  useEffect(() => {
    getProductTitle();
  }, []);

  return (
    <Wrapper>
      <p>
        {productTitle}
      </p>
      <p>
        Qty
        {' '}
        {orderProduct.quantity}
      </p>
      <p>
        &#36;
        {orderProduct.productPrice}
      </p>
    </Wrapper>
  );
}
