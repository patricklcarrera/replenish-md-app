import React, {useEffect, useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';

export default function Header({userProfile}) {
  // const [userProfile, setUserProfile] = useState(null);

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
  // useEffect(() => {
  //   fetch(`/employees/myprofile`).then((res) => {
  //     if (res.ok) {
  //       res.json().then((userProfile) => setUserProfile(userProfile));
  //     } else {
  //       setUserProfile(null)
  //     }
  //   });
  // }, []);
  //
  // console.log("userProfilefromheader:",userProfile)

  
const adminHeader =     <nav className="bg-blue-400">
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
        <LinkContainer to="/signup"><Nav.Link >Create a new user</Nav.Link></LinkContainer> 
        </button>
        
        <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/products"><Nav.Link >Product List</Nav.Link></LinkContainer> 
        </button>
        <button className="hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium text-gray-700">
        <LinkContainer to="/employees"><Nav.Link >All Employees</Nav.Link></LinkContainer> 
        </button>
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

const employeeHeader = <nav className="bg-blue-400">
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
        <LinkContainer to="/products"><Nav.Link >Product List</Nav.Link></LinkContainer> 
        </button>
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
      {userProfile && userProfile.is_admin ? adminHeader : employeeHeader }
    </div>
  );
}