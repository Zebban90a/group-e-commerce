import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function NavBar() {
  const linkArray = [{
    "path" : "/products",
    "name" : "Products"},{
    "path" : "/admin",
    "name": "Admin"
    },
    {
      "path" : "/",
      "name" : "Home"},{
      "path" : "/user",
      "name": "User"
      },
      {
        "path" : "/register",
        "name" : "Register"},{
        "path" : "/checkout",
        "name": "Checkout"
        },
        {
          "path" : "/login",
          "name" : "Login"},{
          "path" : "/logout",
          "name": "Logout"
          }
  ]

  const StyledNav = styled.nav`
  background: pink;
  `
  const StyledButton = styled.button`
  background: red;
  padding: 10px;
  margin-right: 15px;
  &:hover{
   background: blue; 
  }
  `
  return (
    <StyledNav>
      {linkArray.map(link =>{
        return (
          <Link to={link.path}>
              <StyledButton>
                <span type="button" className="nav-link ml-2">
                  {link.name}
                </span>
              </StyledButton>
              </Link>
        )}
      )}
      
    </StyledNav>
  );
}
