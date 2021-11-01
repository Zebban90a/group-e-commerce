import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import CartPage from './pages/CartPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminPage from './pages/AdminPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import NavBar from './components/NavBar';
import CheckoutPage from './pages/CheckoutPage';
import UserContext from './contexts/UserContext';
axios.defaults.withCredentials = true;
export default function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIsLoggedIn = async () => {
    const { data } = await axios.get('https://group-e-commerce.herokuapp.com/auth/isloggedin');
    console.log('data isloggedin', data);
    if (data === true) {
      setIsLoggedIn(true);
    }
  };

  const checkIsAdmin = async () => {
    const { data } = await axios.get('https://group-e-commerce.herokuapp.com/auth/isadmin');
    console.log('data isAdmin', data);
    if (data === true) {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    console.log('checkIsLoggedIn, checkIsAdmin');
    checkIsLoggedIn();
    checkIsAdmin();
  }, []);

  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    console.log('localStorageCart', localStorageCart);
    if (cart.length !== 0) {
      console.log('JSON.stringify(cart)', JSON.stringify(cart));
      console.log(`localStorage.setItem('cart', JSON.stringify(cart));`);
      localStorage.setItem('cart', JSON.stringify(cart));
    } else if (localStorageCart && localStorageCart.length) {
      setCart(localStorageCart);
    }
  }, [cart]);

  return (
    <div>
      <UserContext.Provider value={{ cart, setCart }}>
        <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <Switch>
          <Route path="/cart" component={CartPage} />
          {isLoggedIn && <Route path="/checkout" component={CheckoutPage} />}
          {isLoggedIn && <Route path="/user" component={UserPage} />}
          <Route path="/login" component={LoginPage} />

          {isAdmin && <Route path="/admin/orders" exact component={AdminOrdersPage} />}
          {isAdmin
            && <Route path="/admin/products/:id" exact component={AdminProductEditPage} />}
          {isAdmin
            && <Route path="/admin/products" exact component={AdminProductsPage} />}
          {isAdmin && <Route path="/admin" exact component={AdminPage} />}

          <Route path="/products/:id" exact component={ProductDetailPage} />
          <Route path="/products" exact component={ProductListPage} />
          <Route path="/" exact component={ProductListPage} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
