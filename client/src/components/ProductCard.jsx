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
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
  a:hover {
    .title{
      text-decoration: underline;
    }
  }
  .details-link{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .display-img {
    object-fit: cover;
    height: 240px;
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
    -webkit-line-clamp: 2;
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
      padding-bottom: 3px;
      margin-right: 5px;
    }
  }
  .addToCart {
    display: flex;
    justify-self: flex-end;
    background-color: #01da01;
    height: 40px;
  }
`

export default function ProductCard(props) {
  const { _id, title, price, images, quantity} = props.product;

  return (
    <Card>
      <Link to={'./products/'+_id} className="details-link">
        <div>
          <img
            className="display-img"
            src={images[0] || noImage}
            onError={(e)=>{e.target.src=noImage}}
            alt="no-img-available"/>
          <span className="title">{title}</span>
        </div>
        <div>
          <span className="price">${price}</span>
        </div>
      </Link>
      <div>
        <div className="availability">
          <img className="checkmark" src={quantity? checkmark : crossmark}/>
          <div>{quantity} available</div>
        </div>
        <Link to={'./products/1'}> {/* //TODO make it add to cart */}
          <button className="addToCart">Add to cart</button>
        </Link>
      </div>
    </Card>
  )
}
