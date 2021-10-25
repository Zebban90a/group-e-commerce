import React, { useState } from 'react';
import axios from 'axios';

export default function CheckoutPage() {
  const [formInput, setFormInput] = useState({});

  function submitHandler(e) {
    e.preventDefault();

    const payload = {
      formInput

    };
    axios({
      url: '/api/checkout',
      method: 'POST',
      data: payload,
    });



  }
  function onChangeHandler(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormInput({
      ...formInput,
      [inputName]: inputValue,
    });
    const data = formInput || {};

  }
  return (

    <form onSubmit={submitHandler} encType="multipart/form-data">
      <label htmlFor="city">City: </label>
      <input onChange={onChangeHandler} type="text" name="city" id="city" value={formInput.city || ''} required />
      <label htmlFor="street">Street: </label>
      <input onChange={onChangeHandler} type="text" name="street" id="street" value={formInput.street || ''} required />
      <label htmlFor="housenumber">Housenumber: </label>
      <input onChange={onChangeHandler} type="text" name="housenumber" id="housenumber" value={formInput.housenumber || ''} required />

      <label htmlFor="zip">Zip: </label>
      <input onChange={onChangeHandler} type="text" name="zip" id="zip" value={formInput.zip || 0} required />

      {/* <input onChange={onChangeHandler} type="text" name="category" id="category" value={data.category || ''} />  required */}
      <button type="submit">SUBMITÖ</button>
    </form>
  );
}
