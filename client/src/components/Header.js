import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-bootstrap/Image'

export default function Header() {

  const adminHeader = 
  <Navbar bg="light" expand="lg">
  <Container align='center'>
  <Navbar.Brand href="/addinvoice"><Image src="/replenish-logo.png" width="100px" roundedCircle /></Navbar.Brand>
         <LinkContainer to="/addinvoice"><Nav.Link>Submit invoice</Nav.Link></LinkContainer>    
         <LinkContainer to="/invoicelist"><Nav.Link >All Invoices</Nav.Link></LinkContainer>      
         <LinkContainer to="/products"><Nav.Link>Product List</Nav.Link></LinkContainer>           
         <LinkContainer to="/employees"><Nav.Link>Employee List</Nav.Link></LinkContainer>    
         <LinkContainer to="/settings"><Nav.Link>Settings</Nav.Link></LinkContainer>           
 </Container>
</Navbar>

const employeeHeader =
<Navbar bg="light" expand="lg">
<Container align='center'>
<Navbar.Brand href="/addinvoice"><Image src="/replenish-logo.png" width="100px" roundedCircle /></Navbar.Brand>
       <LinkContainer to="/addinvoice"><Nav.Link>Submit invoice</Nav.Link></LinkContainer>    
       <LinkContainer to="/invoicelist"><Nav.Link >All Invoices</Nav.Link></LinkContainer>      
       <LinkContainer to="/products"><Nav.Link>Product List</Nav.Link></LinkContainer>             
       <LinkContainer to="/settings"><Nav.Link>Settings</Nav.Link></LinkContainer>           
</Container>
</Navbar>
  return (
    <div>
      {/* is_admin? {adminHeader} : {employeeHeader} */}
      {adminHeader}
    </div>
  );
}