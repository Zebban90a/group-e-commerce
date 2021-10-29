/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

export default function CartPage() {
  const { cart, setCart } = useContext(UserContext);
  const [productList, setProductList] = useState([]);

  async function getProduct(id) {
    const path = `/api/products/${id}`;
    const { data } = await axios.get(path);
    return data.data.product;
  }

  async function getProductList() {
    const output = [];

    for (const item of cart) {
      // eslint-disable-next-line no-await-in-loop
      const data = await getProduct(item.id);
      data.qtyInCart = item.quantity;
      output.push(data);
    }
    setProductList([...output]);
  }

  function addToCart(id) {
    const updatedCart = cart;

    cart.map((cartProduct, index) => {
      if (cartProduct.id === id) {
        updatedCart[index].quantity += 1;
        setCart([...updatedCart]);
        return null;
      }
      return null;
    });
  }

  function removeFromCart(id) {
    const updatedCart = cart;

    cart.map((cartProduct, index) => {
      if (cartProduct.id === id) {
        updatedCart[index].quantity -= 1;
        if (updatedCart[index].quantity === 0) {
          updatedCart.splice(index, 1);
        }
        if (updatedCart.length) {
          setCart([...updatedCart]);
        } else {
          setCart([]);
          localStorage.removeItem('cart');
          getProductList();
        }
        return null;
      }
      return null;
    });
  }

  function renderCartItem(product) {
    const {
      title, price, qtyInCart, quantity, _id,
    } = product;

    return (
      <div key={_id}>
        <span>
          <span>{`Produkt: ${title || 'no name'}`}</span>
          <br />
          <span>{`Pris: ${price} kr`}</span>
          <button
            type="button"
            onClick={() => removeFromCart(_id)}
          >
            -
          </button>
          {qtyInCart}
          <button
            type="button"
            onClick={() => addToCart(_id)}
            disabled={qtyInCart >= quantity}
          >
            +
          </button>
        </span>
      </div>
    );
  }

  useEffect(() => {
    if (cart.length) {
      getProductList();
    }
  }, [cart]);

  return (
    <div>
      <h1>CART</h1>
      {productList.map((product) => (renderCartItem(product)))}
      <br />
      <Link to="/checkout"><h3>Go to Checkout</h3></Link>
    </div>

  );
}
