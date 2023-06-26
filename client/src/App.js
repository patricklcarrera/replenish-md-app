import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AddInvoice from "./components/AddInvoice";
import AddInvoices from "./components/AddInvoices";
import InvoiceList from "./components/InvoiceList";
import ProductList from "./components/ProductList";
import Signup from "./components/Signup";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Header";
import Homepage from "./components/Homepage";
import MyProfile from "./components/MyProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./components/AddProduct";
import ResetPassword from "./components/ResetPassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inventory from "./components/Inventory";

function App() {
  const [invoiceList, setInvoiceList] = useState();
  const [productList, setProductList] = useState();
  const [searchTerm, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [clientsList, setClientsList] = useState();
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    fetch("/invoices")
      .then((r) => r.json())
      .then((data) => {
        setInvoiceList(data);
      });
  }, []);

  useEffect(() => {
    fetch("/clients")
      .then((r) => r.json())
      .then((data) => {
        setClientsList(data);
      });
  }, []);

  useEffect(() => {
    fetch(`/employees/myprofile`).then((res) => {
      if (res.ok) {
        res.json().then((userProfile) => setUserProfile(userProfile));
      } else {
        setUserProfile(null);
      }
    });
  }, []);

  const updateEmployee = (employee) => setUserProfile(employee);

  useEffect(() => {
    fetch("/products")
      .then((r) => r.json())
      .then((data) => {
        setProductList(data);
      });
  }, []);

  useEffect(() => {
    fetch("/employees")
      .then((r) => r.json())
      .then((data) => {
        // console.log({ data });
        setEmployeeList(data);
      });
  }, []);

  const addProduct = (newProduct) => {
    const updatedProducts = [...productList, newProduct];
    setProductList(updatedProducts);
  };
  const addInvoice = (newInvoice) => {
    const updatedInvoice = [...invoiceList, newInvoice];
    setInvoiceList(updatedInvoice);
  };

  const onDeleteProduct = (id) => {
    const updatedProductsList = productList.filter(
      (product) => product.id !== id
    );
    setProductList(updatedProductsList);
  };

  const changeSearch = (value) => {
    setSearch(value);
  };
  const handleProductSave = (updatedProduct) => {
    const updatedProducts = productList.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProductList(updatedProducts);
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login updateEmployee={updateEmployee} />} />
          <Route
            path="/inventories"
            element={
              <Inventory
                employeeList={employeeList}
                userProfile={userProfile}
              />
            }
          />

          {userProfile && userProfile.is_admin ? (
            <>
              <Route path="/resetPassword" element={<ResetPassword />} />

              <Route
                path="/addproduct"
                element={
                  <AddProduct
                    addProduct={addProduct}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/employees"
                element={<EmployeeList userProfile={userProfile} />}
              />
              <Route
                path="/invoicelist"
                element={
                  <InvoiceList
                    invoiceList={invoiceList}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/products"
                element={
                  <ProductList
                    onSave={handleProductSave}
                    productList={productList}
                    onDeleteProduct={onDeleteProduct}
                    searchTerm={searchTerm}
                    changeSearch={changeSearch}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/addinvoice"
                element={
                  <AddInvoices
                    productList={productList}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/signup"
                element={<Signup userProfile={userProfile} />}
              />
              <Route
                path="/myprofile"
                element={
                  <MyProfile
                    employeeList={employeeList}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/inventory"
                element={<Inventory userProfile={userProfile} />}
              />
              <Route
                path="*"
                element={
                  <MyProfile
                    userProfile={userProfile}
                    employeeList={employeeList}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/myprofile"
                element={
                  <MyProfile
                    employeeList={employeeList}
                    userProfile={userProfile}
                   />
                }
              />
              <Route
                path="/products"
                element={
                  <ProductList
                    onSave={handleProductSave}
                    productList={productList}
                    onDeleteProduct={onDeleteProduct}
                    searchTerm={searchTerm}
                    changeSearch={changeSearch}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/addinvoice"
                element={
                  <AddInvoices
                    productList={productList}
                    clientsList={clientsList}
                    userProfile={userProfile}
                  />
                }
              />
              <Route
                path="/employees"
                element={<EmployeeList userProfile={userProfile} />}
              />
              <Route
                path="*"
                element={<MyProfile userProfile={userProfile} />}
              />
            </>
          )}
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
