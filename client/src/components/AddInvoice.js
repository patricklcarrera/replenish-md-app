import React, { useState } from 'react';
import Header from './Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddInvoice({addInvoice}) {
 const addInvoiceFormData = {
        employee_id:'',
        client_id: '',
        product_id: '',
        charge: ''
        
    }

const [formData, setFormData] = useState(addInvoiceFormData)
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
}

    const handleAddInvoiceSubmit = (e) => {
      e.preventDefault()
      fetch("/invoices/new", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(() => {
        addInvoice(formData)
      setFormData(addInvoiceFormData)
  }) }

  const tailwindForm = 
  <>
  <Header/>
  <form className="max-w-md mx-auto mt-4 p-4 bg-blue-200 shadow-lg rounded-lg" onSubmit={handleAddInvoiceSubmit}>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="employee_id">
      Employee ID
    </label>
    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="employee_id" type="number" name="employee_id" value={formData.employee_id} onChange={handleChange} />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="client_id">
      Client ID
    </label>
    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="client_id" type="number" name="client_id" value={formData.client_id} onChange={handleChange} />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="product_id">
     Product ID
    </label>
    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product_id" type="integer" name="product_id" value={formData.product_id} onChange={handleChange} />
  </div>
  <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="charge">
          Charge
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="charge" type="number" name="charge" value={formData.charge} onChange={handleChange} />
      </div>
  <div className="flex justify-center">
    <button onClick={handleAddInvoiceSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Add Invoice
    </button>
  </div>
</form>
</>
  return(
    <div>
        {/* <Header/>
    <h1 style={{"padding": "1px", "text-align" : "center"}}>Add Invoice</h1>
    <Form onSubmit={handleAddInvoiceSubmit}>
        <Form.Group>
        <div style={{"padding": "5px"}}>
            <Form.Control
                type="text"
                as="textarea"
                name="employee_name"
                placeholder='Employee Name'
                value={formData.employee_name}
                onChange={handleChange}/>
            </div>
        <div style={{"padding": "5px"}}>
            <Form.Control
                type="text"
                as="textarea"
                name="client_name"
                placeholder='Client Name'
                value={formData.client_name}
                onChange={handleChange}/>
            </div>
            <div style={{"padding": "5px"}}>
            <Form.Control
                type="integer"
                as="textarea"
                name="charge"
                placeholder='Charge'
                value={formData.charge}
                onChange={handleChange}/>
            </div>
            <div style={{"padding": "5px"}}>
            <Form.Control
                type="text"
                name="product_name"
                as="textarea"
                placeholder='Product Name'
                value={formData.product_name}
                onChange={handleChange}/>
            </div>
            <div style={{"padding": "5px", "text-align": "center"}}>
            <Button
                className='addButton'
                type='submit'
                >
                    Add
            </Button>
            </div>
        </Form.Group>
    </Form> */}
    {tailwindForm}
    </div>

)
}