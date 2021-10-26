import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function OrderProductDetails({ cartItem }) {
  const [productTitle, setProductTitle] = useState('');

  return (
    <Wrapper>
      <p>
        {cartItem.Title}
      </p>
      <p>
        &#36;
        {cartItem.Price}
      </p>
    </Wrapper>
  );
}
