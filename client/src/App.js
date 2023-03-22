import { useState, useEffect } from "react";
import { BrowserRouter, Switch , Route, Routes } from "react-router-dom";
import Login from './components/Login';
import AddInvoice from './components/AddInvoice';
import InvoiceList from './components/InvoiceList';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList'
import Navbar from "./components/Header";
import Homepage from "./components/Homepage"
import Settings from "./components/Settings";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [employeeList, setEmployeeList] = useState();
  const [invoiceList, setInvoiceList] = useState();
  const [productList, setProductList] = useState();
  

  useEffect(()=> {
    fetch("/employees")
    .then(r => r.json())
    .then(data => {
      setEmployeeList(data)
    })
  }, [])

  
  useEffect(()=> {
    fetch("/invoices")
    .then(r => r.json())
    .then(data => {
      setInvoiceList(data)
    })
  }, [])


  useEffect(()=> {
    fetch("/products")
    .then(r => r.json())
    .then(data => {
      setProductList(data)
    })
  }, [])

  console.log(invoiceList)
  console.log(employeeList)
  return (
 <div>
  <BrowserRouter>
    <Routes>
      <Route path='/addinvoice'
      element={<AddInvoice/>}/>
      <Route path='/employees'
      element={<EmployeeList employeeList={employeeList}/>}/>
      <Route path='/invoicelist'
      element={<InvoiceList invoiceList={invoiceList}/>}/>
      <Route path='/products'
      element={<ProductList productList={productList}/>}/>
      <Route path='/login'
      element={<Login/>}/>
      <Route path='/signup'
      element={<Signup/>}/>
       <Route path='/settings'
      element={<Settings/>}/>
      
    </Routes>
  </BrowserRouter>
 </div>
  );
}

export default App;