import React from 'react';
import styled from 'styled-components';
import Order from './Order';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
`;

export default function Orders({ orders, admin }) {
  return (
    <Container>
      {orders.map((order) => <Order key={order._id} order={order} admin={admin} />)}
    </Container>
  );
}
