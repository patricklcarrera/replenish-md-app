import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate()

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then (res => {
      if(res.ok){
        navigate('/')
      }
    })
  }

  const adminHeader = 
  <Navbar bg="light" expand="lg">
  <Container align='center'>
  <Navbar.Brand href="/addInvoice"><Image src="/replenish-logo.png" width="100px" roundedCircle /></Navbar.Brand>
         <LinkContainer to="/addinvoice"><Nav.Link>Submit invoice</Nav.Link></LinkContainer>    
         <LinkContainer to="/invoicelist"><Nav.Link >All Invoices</Nav.Link></LinkContainer>      
         <LinkContainer to="/products"><Nav.Link>Product List</Nav.Link></LinkContainer>          
         <LinkContainer to="/employees"><Nav.Link>Employee List</Nav.Link></LinkContainer>    
         <LinkContainer to="/employees/:id"><Nav.Link>My Profile</Nav.Link></LinkContainer> 
         <button onClick={handleLogout}>Logout</button>   
 </Container>
</Navbar>

const tailwindNavBar =  <nav className="bg-blue-800 px-4 py-2">
<div className="flex items-center justify-between">
<Navbar.Brand href="/addinvoice"><Image src="/replenish-logo.png" width="70px" roundedCircle /></Navbar.Brand>
  <div className="hidden md:block">
    <ul className="flex items-center">
      <li className="ml-4">
        <Link to="/addinvoice" className="text-white hover:text-gray-200">Add Invoice</Link>
      </li>
      <li className="ml-4">
        <Link to="/invoicelist" className="text-white hover:text-gray-200">Invoice List</Link>
      </li>
      <li className="ml-4">
        <Link to="/products" className="text-white hover:text-gray-200">Product List</Link>
      </li>
      <li className="ml-4">
        <Link to="/employees" className="text-white hover:text-gray-200">Employee List</Link>
      </li>
      <li className="ml-4">
        <Link to="/employees/:id" className="text-white hover:text-gray-200">My Profile</Link>
      </li>
      <button onClick={handleLogout}>Logout</button>   
    </ul>
    
  </div>
  <div className="md:hidden">
    <button type="button" className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200">
      <svg viewBox="0 0 20 20" fill="currentColor" className="menu w-6 h-6">
        <path fillRule="evenodd" d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM1 10a1 1 0 011-1h14a1 1 0 110 2H2a1 1 0 01-1-1zM3 15a1 1 0 100 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
</div>
</nav>

const test =     <nav className="bg-blue-400">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between h-26">
    <div className="flex-shrink-0">
    <Navbar.Brand href="/addInvoice"><Image src="/replenish-logo.png" width="100px" roundedCircle /></Navbar.Brand>
    </div>
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/addinvoice"><Nav.Link>Submit invoice</Nav.Link></LinkContainer> 
        </button>
        <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/invoicelist"><Nav.Link >Invoice List</Nav.Link></LinkContainer> 
        </button>
        
        <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/products"><Nav.Link >Product List</Nav.Link></LinkContainer> 
        </button>
        {/* <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/employees"><Nav.Link >All Employees</Nav.Link></LinkContainer> 
        </button> */}
        <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/myprofile"><Nav.Link >My Profile</Nav.Link></LinkContainer> 
        </button>
        <button onClick={handleLogout} className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
          <a>Logout</a>
        </button>
      </div>
    </div>
  </div>
</div>
</nav>


  return (
    <div>
      {/* is_admin? {adminHeader} : {employeeHeader} */}
      {test}
    </div>
  );
}