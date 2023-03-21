import { useState, useEffect } from "react";
import { BrowserRouter, Switch , Route, Routes } from "react-router-dom";
import Login from './components/Login';
import AddInvoice from './components/AddInvoice';
import InvoiceList from './components/InvoiceList';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList'



function App() {
  const [employeeList, setEmployeeList] = useState(0);

  useEffect(()=> {
    fetch("/employees")
    .then(r => r.json())
    .then(data => {
      setEmployeeList(data)
    })
  }, [])

  console.log(employeeList)
  return (
 <div>
  <BrowserRouter>
    <Routes>
      <Route path='/employees'
      element={<EmployeeList employeeList={employeeList}/>}/>
     
    </Routes>
  </BrowserRouter>
 </div>
  );
}

export default App;