import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export default function NavBar() {
  const linkArray = [
    /* {
      path: '/products',
      name: 'Products',
    }, */
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
      path: '/register',
      name: 'Register',
    },
    {
      path: '/checkout',
      name: 'Checkout',
    },
    {
      path: '/login',
      name: 'Login',
    },
    /* {
      path: '/logout',
      name: 'Logout',

    }, */
    {
      path: '/products?category=apple',
      name: 'Apple',
    },
    {
      path: '/products?category=samsung',
      name: 'Samsung',
    }
  ];

  return (
    <StyledNav>
      {linkArray.map((link, index) => (
        <Link to={link.path} key={index}>
          <StyledButton>
            <span type="button" className="nav-link ml-2">
              {link.name}
            </span>
          </StyledButton>
        </Link>
      ))}
          <a href="http://localhost:5000/auth/logout">
      <StyledButton>
            <span type="button" className="nav-link ml-2">
              logout new
            </span>
          </StyledButton>
            </a>
    </StyledNav>
  );
}
