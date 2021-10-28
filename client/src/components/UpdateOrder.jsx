import React, { useState } from 'react';
import axios from 'axios';

export default function UpdateOrder({ id }) {
  const [orderStatus, setOrderStatus] = useState('');

  function onChangeHandler(e) {
    setOrderStatus(e.target.value);
  }

  async function updateOrderStatus() {
    const path = `../api/orders/${id}`;
    await axios.patch(path, { status: orderStatus });
    await logData();
  }
  
  const submitUserData = async (e) => {
    e.preventDefault();
    updateOrderStatus();
  };

  return (
    <div>
      <form onSubmit={submitUserData}>
        <select onChange={onChangeHandler}>
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
