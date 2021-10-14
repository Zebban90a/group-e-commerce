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

export default function App() {
  return (
    <div>
      <Switch>
        <Route path='/products/:id' component={ProductDetailPage} />
        <Route path='/products' component={ProductListPage} />

        <Route path='/checkout' component={CheckoutPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/user' component={UserPage} />

        <Route path='/admin/orders' component={AdminOrdersPage} />
        <Route path='/admin/products' component={AdminProductsPage} />
        <Route path='/admin/products/:id' component={AdminProductEditPage} />
        <Route path='/admin' component={AdminPage} />

        <Route path='/' component={HomePage} />
      </Switch>
    </div>
  );
}
