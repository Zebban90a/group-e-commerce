import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import noImage from '../no-img.png';
import checkmark from '../checkmark.svg';
import crossmark from '../crossmark.svg';

const Card = styled.div`
  padding: 15px;
  border: 1px solid black;
  height: 400px;
  
  .display-img {
    object-fit: cover;
    height: 65%;
    width: 100%;
  }
  span {
    display: block;
    font-weight: bold;
  }
  .title {
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  .price {
    font-size: 1.5em;
  }
  .availability {
    display: flex;
    align-items: center;
    img {
      width: 28px;
      padding-bottom: 1px;
      margin-right: 5px;
    }
  }
  .addToCart {
    background-color: #01da01;
  }
`

//TODO make the title underline appear when hovering over card like on netonnet
//TODO make price/addToCart/inStock stay on the same height

export default function ProductCard(props) {
  const { _id, title, price, images, quantity} = props.product;

  return (
    <Card>
      <Link to={'./products/'+_id}>
        <img
          className="display-img"
          src={images[0] || noImage}
          onError={(e)=>{e.target.src=noImage}}
          alt="no-img-available"/>
        <span className="title">{title}</span>
        <span className="price">{price}</span>
      </Link>
      <div className="availability">
        <img className="checkmark" src={quantity? checkmark : crossmark}/>
        <div>{quantity} available</div>
      </div>
      <Link to={'./products/1'}>
        <div className="addToCart">
          <span>Add to cart</span>
        </div>
      </Link>
    </Card>
  )
}
