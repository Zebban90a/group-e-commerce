import React, { useState } from 'react';
import axios from 'axios';

export default function UpdateOrder({ id }) {
  const [orderStatus, setOrderStatus] = useState('');

  function onChangeHandler(e) {
    setOrderStatus(e.target.value);
  }

  async function updateOrderStatus() {
    const path = `https://group-e-commerce.herokuapp.com/api/orders/${id}`;
    await axios.patch(path, { status: orderStatus });
  }

  const submitUserData = async (e) => {
    e.preventDefault();
    await updateOrderStatus();
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={submitUserData}>
        <select onChange={onChangeHandler} defaultValue="none">
          <option value="none" disabled>Select a status</option>
          <option value="0">pending</option>
          <option value="1">shipped</option>
          <option value="2">completed</option>
          <option value="3">cancelled</option>
        </select>
        <button type="submit">Update status</button>
      </form>
    </div>
  );
}
