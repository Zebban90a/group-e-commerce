import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import noImage from '../no-img.png';

const Card = styled.div`
  padding: 15px;
  border: 1px solid black;
  height: 400px;
  
  img {
    object-fit: cover;
    height: 65%;
    width: 100%;
  }
  span {
    display: block;
    font-weight: bold;
  }
  #title {
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  #price {
    font-size: 1.5em;
  }
  #addToCart {
    background-color: pink;
  }
`
//TODO add in-stock indicator with the quantity variable
//TODO make the title underline appear when hovering over card like on netonnet
//TODO make price/addToCart/inStock stay on the same height

export default function ProductCard(props) {
  const { _id, title, price, images, quantity} = props.product;

  return (
    <Card>
      <Link to={'./products/'+_id}>
        <img
          src={images[0] || noImage}
          onError={(e)=>{e.target.src=noImage}}
          alt="no-img-available"/>
        <span id="title">{title}</span>
        <span id="price">{price}</span>
      </Link>
      
      <Link to={'./products/1'}>
        <div id="addToCart">
          <span>Add to cart</span>
        </div>
      </Link>
    </Card>
  )
}
