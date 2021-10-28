import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

export default function CartPage() {
  const { cart, setCart } = useContext(UserContext); //TODO Setcart = localstorage
  const [productList, setProductList] = useState([]);

  async function getProductList() {
    let output = [];
    console.log('CART', cart);
    for (const item of cart) {
      const data = await getProduct(item.id);
      data.qtyInCart = item.quantity;
      output.push(data)
    }
    setProductList([...output])
  }

  async function getProduct(id) {
    const path = `/api/products/${id}`;
    const { data } = await axios.get(path);
    return data.data.product;
  }

  function renderCartItem(product) {
    const { title, price, qtyInCart, quantity, _id } = product;

    return (
      <div key={_id}>
        <span>
          <span>{`Produkt: ${title || 'no name'}`}</span>
          <br />
          <span>{`Pris: ${price} kr`}</span>
          <button
            onClick={e => addToCart(_id)}
            disabled={qtyInCart >= quantity}
          >+</button>
          {qtyInCart}
          <button onClick={e => removeFromCart(_id)}>-</button>
        </span>
      </div>
    )
  }

  function addToCart(id) {
    let updatedCart = cart;

    cart.map((cartProduct, index) => {
      if (cartProduct.id === id) {
        updatedCart[index].quantity += 1;
        setCart([...updatedCart]);
        return;
      }
    })
  }

  function removeFromCart(id) {
    let updatedCart = cart;

    cart.map((cartProduct, index) => {
      if (cartProduct.id === id) {
        updatedCart[index].quantity -= 1;
        if (updatedCart[index].quantity === 0) {
          updatedCart.splice(index, 1);
        }
        if (updatedCart.length) {
          setCart([...updatedCart]);
        } else {
          setCart(oldCart => []);
          localStorage.removeItem('cart');
          getProductList();
        }
        return;
      }
    })
  }

  useEffect(() => {
    if (cart.length) {
      getProductList();
    }
  }, [cart])

  return (
    <div>
      <h1>CART</h1>
      {productList.map(product => {
        return (renderCartItem(product))
      })}
      <br />
      <Link to="/checkout"><h3>Go to Checkout</h3></Link>
    </div>

  );
}
