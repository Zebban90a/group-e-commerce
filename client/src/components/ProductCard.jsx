import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
  
  .product-link{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
  }
  .product-link:hover {
    .title{
      text-decoration: underline;
    }
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
`;

export default function ProductCard({ product }) {
  const {
    _id, title, price, images, quantity,
  } = product;

  async function addToCart(e) {
    e.preventDefault();
    const mockUserId = '616fdfbc1576abbb9e174e03';
    const payload = {
      productTitle: title,
      productPrice: price,
      productId: _id,
      userId: mockUserId,

    };
    axios({
      url: 'http://localhost:5000/api/addtocart',
      method: 'POST',
      data: payload,
    });

    console.log(title);
  }

  return (
    <Card>
      <Link to={`./products/${_id}`} className="product-link">
        <div>
          <img
            className="display-img"
            src={images[0] || noImage}
            onError={(e) => { e.target.src = noImage; }}
            alt={images[0] ? 'product image' : 'no available product image'}
          />
          <span className="title">{title}</span>
        </div>
        <div>
          <span className="price">
            $
            {price}
          </span>
        </div>
      </Link>
      <div>
        <div className="availability">
          <img
            className="checkmark"
            src={quantity ? checkmark : crossmark}
            alt={quantity ? 'checkmark' : 'crossmark'}
          />
          <div>
            {quantity}
            {' '}
            available
          </div>
        </div>
        <button
          className="addToCart"
          onClick={addToCart}
          disabled={!quantity}
          type="button"
        >
          Add to cart
        </button>
      </div>
    </Card>
  );
}
