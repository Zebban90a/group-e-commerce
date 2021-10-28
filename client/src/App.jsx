import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
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
import CheckoutPage from './pages/CheckoutPage';
import { UserContext } from './contexts/UserContext';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIsLoggedIn = async () => {
    const { data } = await axios.get('/auth/isloggedin');
    console.log(data);
    setIsLoggedIn(data);
  }

  const checkIsAdmin = async () => {
    const { data } = await axios.get('/auth/isadmin');
    console.log(data);
    setIsAdmin(data);
  }

  useEffect(() => {
    console.log('rendering App.jsx');
    checkIsLoggedIn();
    checkIsAdmin();
  }, []);
  
   useEffect(() => {
  
    const localStorageCart = JSON.parse(localStorage.getItem('cart'))

    if (cart.length !== 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    } else if (localStorageCart && localStorageCart.length) {
      setCart(localStorageCart);
    }
  }, [cart])

  return (
    <div>
      <UserContext.Provider value={{ cart, setCart, }}>
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <Switch>
        <Route path="/cart" component={CartPage} />
        {isLoggedIn && <Route path="/checkout" component={CheckoutPage} />}
        {isLoggedIn && <Route path="/user" component={UserPage} />}
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        {/* todo general 404 page for nonadmins (and non logged in) */}

        {isAdmin && <Route path="/admin/orders" component={AdminOrdersPage} />}
        {isAdmin &&
          <Route path="/admin/products/:id" component={AdminProductEditPage} />}
        {isAdmin &&
          <Route path="/admin/products" component={AdminProductsPage} />}
        {isAdmin && <Route path="/admin" component={AdminPage} />}

        <Route path="/products/:id" component={ProductDetailPage} />
        <Route path="/products" component={ProductListPage} />
        <Route path="/" component={ProductListPage} />
      </Switch>
      </UserContext.Provider>   
    </div>
  );
}
