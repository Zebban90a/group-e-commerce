import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div>
      <h1>admin overview</h1>
      <Link to="admin/products"> Products </Link>
      <br />
      <Link to="admin/orders"> Order </Link>
    </div>
  );
}
