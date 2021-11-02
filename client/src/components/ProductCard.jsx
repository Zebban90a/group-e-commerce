import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noImage from '../no-img.png';
import checkmark from '../checkmark.svg';
import crossmark from '../crossmark.svg';
import UserContext from '../contexts/UserContext';
import AddToCartBtn from './AddToCartBtn';

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
    background-color: #01DA01;
    height: 40px;
  }
`;

export default function ProductCard({ product }) {
  const { cart, setCart } = useContext(UserContext);
  const {
    _id, title, price, images, quantity,
  } = product;

  return (
    <Card>
      <Link to={`/products/${_id}`} className="product-link">
        <div>
          <img
            className="display-img"
            src={`https://group-e-commerce.herokuapp.com/${images[0]}` || noImage}
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
        <AddToCartBtn cart={cart} setCart={setCart} disabled={!quantity} productId={_id} />
      </div>
    </Card>
  );
}
