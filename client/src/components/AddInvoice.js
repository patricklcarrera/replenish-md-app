import React, { useState } from 'react';
import Header from './Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddInvoice({addInvoice, productList}) {
 const addInvoiceFormData = {
        client_name: '',
        product_name: '',
        charge: ''
        
    }
     console.log(productList)

    const [selectedDate, setSelectedDate] = useState('');

const [formData, setFormData] = useState(addInvoiceFormData)
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
}

const [products, setProducts] = useState([
  { id: 1, name: '', quantity: '', price: '', totalPrice: '' }
]);

const handleTableChange = (e, index) => {
  const { name, value } = e.target;
  const updatedProducts = [...products];
  updatedProducts[index][name] = value;
  setProducts(updatedProducts);
};

const handleAddRow = () => {
  const newRow = { id: Date.now(), name: '', quantity: '', price: '', totalPrice: '' };
  setProducts([...products, newRow]);
};

const handleRemoveRow = (id) => {
  const updatedProducts = products.filter((product) => product.id !== id);
  setProducts(updatedProducts);
};
const handleConsolelog = () => {
  console.log("test")
}

    const handleAddInvoiceSubmit = (e) => {
      e.preventDefault()
      fetch("/api/invoices/new", {
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

  function handleTestSubmit(event) {
    event.preventDefault();
    console.log("test")
  }
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const tailwindForm = 
  <>
  <Header/>
  <form className="max-w-md mx-auto mt-4 p-4 bg-blue-200 shadow-lg rounded-lg"  onSubmit={handleAddInvoiceSubmit}>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="client_name">
      Client Name
    </label>
    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="client_name" type="text" name="client_name" value={formData.client_name} onChange={handleChange} />
  </div>
  <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
        Date of service
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" value={selectedDate} onChange={handleDateChange}/>
      </label>
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2" htmlFor="product_name">
     Product Name
    </label>
    <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product_name" type="text" name="product_name" value={formData.product_name} onChange={handleChange} />
  </div>
  <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="charge">
          Charge
        </label>
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="charge" type="number" name="charge" value={formData.charge} onChange={handleChange} />
      </div>
  <div className="flex justify-center">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Add Invoice
    </button>
  </div>
</form>
</>

  const [clientName, setClientName] = useState('');
  const [conciergeFeePaid, setConciergeFeePaid] = useState(false);
  const [cashPaid, setCashPaid] = useState(0);
  const [creditPaid, setCreditPaid] = useState(0);
  const [comments, setComments] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [personalDiscount, setPersonalDiscount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log({
      clientName,
      selectedDate,
      conciergeFeePaid,
      cashPaid,
      creditPaid,
      comments,
      tipAmount,
      personalDiscount
    });

    // Reset form fields
    setClientName('');
    setSelectedDate('');
    setConciergeFeePaid(false);
    setCashPaid(0);
    setCreditPaid(0);
    setComments('');  
    setTipAmount(0);
    setPersonalDiscount(0);
  };
  

  const testForm = 
  <>
  <Header/>
  <form onSubmit={handleSubmit} className="bg-blue-100 p-8 rounded-lg shadow-md">
      <div className="flex flex-col w-80">
        <div className="mb-2">
          <label htmlFor="clientName" className="text-base font-medium text-blue-800">
            Client Name:
          </label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="date" className="text-base font-medium text-blue-800">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="cashPaid" className="text-base font-medium text-blue-800">
            Paid by Client (Cash): $
          </label>
          <input
            type="number"
            id="cashPaid"
            value={cashPaid}
            onChange={(e) => setCashPaid(Number(e.target.value))}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="creditPaid" className="text-base font-medium text-blue-800">
            Paid by Client (Credit): $
          </label>
          <input
            type="number"
            id="creditPaid"
            value={creditPaid}
            onChange={(e) => setCreditPaid(Number(e.target.value))}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="tipAmount" className="text-base font-medium text-blue-800">
            Tip: $
          </label>
          <input
            type="number"
            id="tipAmount"
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="personalDiscount" className="text-base font-medium text-blue-800">
            Personal Discount: $
          </label>
          <input
            type="number"
            id="personalDiscount"
            value={personalDiscount}
            onChange={(e) => setPersonalDiscount(Number(e.target.value))}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="comments" className="text-base font-medium text-blue-800">
            Comments:
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="block w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </div>
    
      <div className="justify-end">
      <div >
        <table className="w-full mt-4 bg-blue-100 rounded-lg overflow-hidden">
          {/* Table header */}
          <thead>
            <tr>
              <th className="py-2 px-4 bg-blue-200 text-blue-800">Product Name</th>
              <th className="py-2 px-4 bg-blue-200 text-blue-800">Quantity</th>
              <th className="py-2 px-4 bg-blue-200 text-blue-800">Price</th>
              <th className="py-2 px-4 bg-blue-200 text-blue-800">Total Price</th>
              <th className="py-2 px-4 bg-blue-200 text-blue-800"></th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b border-blue-400">
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-2 px-4 border-b border-blue-400">
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-2 px-4 border-b border-blue-400">
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-2 px-4 border-b border-blue-400">
                  <input
                    type="number"
                    name="totalPrice"
                    value={product.totalPrice}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </td>
                <td className="py-2 px-4 border-b border-blue-400">
                  {index === products.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(product.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </form>
  </>
  const testTable = 
  <>
      {/* <div className="flex justify-center">
      <table className="w-full max-w-md mt-4 bg-blue-100 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-blue-200 text-blue-800">Product Name</th>
            <th className="py-2 px-4 bg-blue-200 text-blue-800">Quantity</th>
            <th className="py-2 px-4 bg-blue-200 text-blue-800">Price</th>
            <th className="py-2 px-4 bg-blue-200 text-blue-800">Total Price</th>
            <th className="py-2 px-4 bg-blue-200 text-blue-800"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b border-blue-400">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td className="py-2 px-4 border-b border-blue-400">
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td className="py-2 px-4 border-b border-blue-400">
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td className="py-2 px-4 border-b border-blue-400">
                <input
                  type="number"
                  name="totalPrice"
                  value={product.totalPrice}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </td>
              <td className="py-2 px-4 border-b border-blue-400">
                {index === products.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Add
                  </button>
                )}
                {index !== products.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(product.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
    </>
  return(
    <div>
    {testForm}
 
    </div>

)
}