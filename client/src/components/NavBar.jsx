import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchField from './SearchField';

const StyledNav = styled.nav`
  background: pink;
  `;
const StyledButton = styled.button`
  background: red;
  padding: 10px;
  margin-right: 15px;
  &:hover{
   background: blue; 
  }
  `;

export default function NavBar({ isLoggedIn, isAdmin }) {
  const AdminLinks = [
    {
      path: '/admin',
      name: 'Admin',
    },
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/user',
      name: 'User',
    },
    {
      path: '/cart',
      name: 'Cart',
    },
    {
      path: '/products?category=apple',
      name: 'Apple',
    },
    {
      path: '/products?category=samsung',
      name: 'Samsung',
    },
  ];

  const userLinks = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/user',
      name: 'User',
    },
    {
      path: '/cart',
      name: 'Cart',
    },
    {
      path: '/products?category=apple',
      name: 'Apple',
    },
    {
      path: '/products?category=samsung',
      name: 'Samsung',
    },
  ];

  const standardLinks = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/cart',
      name: 'Cart',
    },
    {
      path: '/products?category=apple',
      name: 'Apple',
    },
    {
      path: '/products?category=samsung',
      name: 'Samsung',
    },
    {
      path: '/login',
      name: 'Login',
    },
  ];

  let linkArray = standardLinks;

  if (isAdmin) {
    linkArray = AdminLinks;
  } else if (isLoggedIn) {
    linkArray = userLinks;
  }

  return (
    <StyledNav>
      {linkArray.map((link) => (
        <Link to={link.path} key={`${link.name}`}>
          <StyledButton>
            <span type="button" className="nav-link ml-2">
              {link.name}
            </span>
          </StyledButton>
        </Link>
      ))}
      {isLoggedIn
        && (
        <a href="https://group-e-commerce.herokuapp.com/auth/logout">
          <StyledButton>
            <span type="button" className="nav-link ml-2">
              Log out
            </span>
          </StyledButton>
        </a>
        )}
      <SearchField />
    </StyledNav>
  );
}
