import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Order from './Order';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
`;

export default function Orders({ orders, admin }) {
  const [sortedOrder, setSortedOrder] = useState([]);
  useEffect(() => {
    if (orders.length > 0) {
      // eslint-disable-next-line max-len
      setSortedOrder(orders.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime()).reverse());
    }
  }, [orders]);

  return (
    <Container>
      {/* eslint-disable-next-line no-underscore-dangle */}
      {sortedOrder.map((order) => <Order key={order._id} order={order} admin={admin} />)}
    </Container>
  );
}
