import React from 'react';
import styled from 'styled-components';
import OrderProductDetails from './OrderProductDetails';

// TODO Fix styling.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  border: 1px solid #333;
  margin: .5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default function Order({ order }) {
  // NOTE How handle order status?
  let orderStatus;
  switch (order.status) {
    case 0:
      orderStatus = 'pending';
      break;
    case 1:
      orderStatus = 'shipped';
      break;
    case 2:
      orderStatus = 'completed';
      break;
    case 3:
      orderStatus = 'cancelled';
      break;
    default:
      orderStatus = 'disputed';
      break;
  }

  return (
    <Container>
      <Wrapper>
        <p>
          <strong>Order#</strong>
          {' '}
          {order._id}
        </p>
        <p>
          <strong>Order Status</strong>
          {' '}
          {orderStatus}
        </p>
      </Wrapper>
      <Container>
        <strong>Products</strong>
        {order.cart.map((cartItem) => (
          /* TODO Add unique id per product object in orders.product array */
          <OrderProductDetails key={cartItem._id} cartItem={cartItem} />
        ))}
      </Container>
      <Wrapper>
        <p>
          <strong>Order Date</strong>
          {' '}
          {order.date}
        </p>
        <p>
          <strong>Order Total</strong>
          {' '}
          {order.orderTotal}
        </p>
      </Wrapper>
    </Container>
  );
}
