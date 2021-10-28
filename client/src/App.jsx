import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

  useEffect(() => {
    console.log(cart);
    const localStorageCart = JSON.parse(localStorage.getItem('cart'))
    
    if (cart.length !== 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    } else if (localStorageCart){
      setCart(localStorageCart);
    }
  }, [cart])


  return (
    <div>
      <UserContext.Provider value={{ cart, setCart }}>
        <NavBar />
        <Switch>
          <Route path="/cart" component={CartPage} /> {/* add remove from cart */}
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user" component={UserPage} />
          {/* todo general 404 page for nonadmins (and non logged in) */}

          <Route path="/admin/orders" component={AdminOrdersPage} />
          <Route path="/admin/products/:id" component={AdminProductEditPage} />
          <Route path="/admin/products" component={AdminProductsPage} />
          <Route path="/admin" component={AdminPage} />

          <Route path="/products/:id" component={ProductDetailPage} /> {/* add remove from cart */}
          <Route path="/products" component={ProductListPage} /> {/* add remove from cart */}
          <Route path="/" component={ProductListPage} /> 
        </Switch>


      </UserContext.Provider>
    </div >
  );
}
