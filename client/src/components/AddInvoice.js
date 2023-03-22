import React, { useState } from 'react';
import Header from './Header';

export default function AddInvoice() {
  const [clientName, setClientName] = useState('');
  const [charge, setCharge] = useState('');
  const [productName, setProductName] = useState('');

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  const handleChargeChange = (event) => {
    setCharge(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Client Name: ${clientName}, Charge: ${charge}, Product Name: ${productName}`);
    // Here you can add your logic to submit the form
  };

  return (
    <>
        <Header/>
        <form onSubmit={handleSubmit}>
        <label>
            Client Name:
            <input type="text" value={clientName} onChange={handleClientNameChange} />
        </label>
        <label>
            Charge:
            <input type="text" value={charge} onChange={handleChargeChange} />
        </label>
        <label>
            Product Name:
            <input type="text" value={productName} onChange={handleProductNameChange} />
        </label>
        <button type="submit">Submit</button>
        </form>
    </>
  );
}


