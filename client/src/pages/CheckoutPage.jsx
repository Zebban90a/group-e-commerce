import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
export default function CheckoutPage() {
  const [formInput, setFormInput] = useState({});
  const { cart, setCart } = useContext(UserContext);

  function submitHandler(e) {
    e.preventDefault();
    const localCart = localStorage.getItem('cart');
    const cart = JSON.parse(localCart);
    const payload = { formInput, cart };
    axios({
      url: '/api/checkout',
      method: 'POST',
      data: payload,
    });
    localStorage.clear();
    setCart("");
  }

  function onChangeHandler(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormInput({
      ...formInput,
      [inputName]: inputValue,
    });
  }

  return (

    <form onSubmit={submitHandler} encType="multipart/form-data">
      <label htmlFor="city">City: </label>
      <input onChange={onChangeHandler} type="text" name="city" id="city" value={formInput.city || ''} required />
      <label htmlFor="street">Street: </label>
      <input onChange={onChangeHandler} type="text" name="street" id="street" value={formInput.street || ''} required />
      <label htmlFor="houseNumber">houseNumber: </label>
      <input onChange={onChangeHandler} type="number" name="houseNumber" id="houseNumber" value={formInput.houseNumber || ''} required />

      <label htmlFor="zip">Zip: </label>
      <input onChange={onChangeHandler} type="text" name="zip" id="zip" value={formInput.zip || 0} required />

      {/* <input onChange={onChangeHandler} type="text" name="category" id="category" value={data.category || ''} />  required */}
      <button type="submit">SUBMIT</button>
    </form>
  );
}
