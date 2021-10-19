import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminPage from './pages/AdminPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div>
      <NavBar />
      <Switch>

        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user" component={UserPage} />
        {/* todo general 404 page for nonadmins (and non logged in) */}

        <Route path="/admin/orders" component={AdminOrdersPage} />
        <Route path="/admin/products/:id" component={AdminProductEditPage} />
        <Route path="/admin/products" component={AdminProductsPage} />
        <Route path="/admin" component={AdminPage} />

        <Route path="/products/:id" component={ProductDetailPage} />
        <Route path="/" component={ProductListPage} />
      </Switch>
    </div>
  );
}
