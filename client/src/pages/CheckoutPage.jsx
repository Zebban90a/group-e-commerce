import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const [formInput, setFormInput] = useState({});
  const [error, setError] = useState(false);

  function submitHandler(e) {
    e.preventDefault();

    const payload = { formInput };
    axios({
      url: '/api/checkout',
      method: 'POST',
      data: payload,
    }).catch(function (error) {
      // TODO update status code in CheckoutController ???
      if (error.response.status === 404) {
        setError(true);
      }
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

  if (error) {
    return (
      <div>
        <p>You have to log in to be able to checkout.</p>
        <Link to='/login'>Go to Login</Link>
      </div>
    );
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
