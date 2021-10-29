/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import OrderProductDetails from './OrderProductDetails';
import UpdateOrder from './UpdateOrder';

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

export default function Order({ order, admin }) {
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
        {admin && <UpdateOrder id={order._id} />}
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
          {(new Date(order.date)).getFullYear()}
          -
          {(new Date(order.date)).getMonth() + 1}
          -
          {(new Date(order.date)).getDate()}
          {' '}
          {(new Date(order.date)).getHours()}
          :
          {(new Date(order.date)).getMinutes()}
        </p>
        <p>
          <strong>Shipping fee:</strong>
          {' '}
          $
          {order.freight}
        </p>
        <p>
          <strong>Order Total</strong>
          {' '}
          $
          {order.orderTotal}
        </p>
      </Wrapper>
    </Container>
  );
}
