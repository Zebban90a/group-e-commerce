import React from 'react'
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid black;
  height: 300px;
`

export default function ProductCard(props) {
  const title = props.product.title;


  return (
    <Card>
      <span>{title}</span>
    </Card>
  )
}
