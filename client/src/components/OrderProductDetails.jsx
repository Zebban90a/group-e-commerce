import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function OrderProductDetails({ cartItem }) {

  return (
    <Wrapper>
      <p>
        {cartItem.title}
      </p>
      <p>
        &#36;
        {cartItem.price}
      </p>
    </Wrapper>
  );
}
