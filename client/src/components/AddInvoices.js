import React, { useState } from 'react';
import Header from "./Header";

export default function AddInvoices({addInvoice, productList})
{
    const [clientName, setClientName] = useState('');
    const [dateOfService, setDateOfService] = useState('');
    const [paidByClientCash, setPaidByClientCash] = useState(0);
    const [paidByClientCredit, setPaidByClientCredit] = useState(0);
    const [comments, setComments] = useState('');
    const [personalDiscount, setPersonalDiscount] = useState(0);
    const [tip, setTip] = useState(0);
    const [conciergeFeePaid, setConciergeFeePaid] = useState(false);
    const [gfe, setGFE] = useState(false);
    const [products, setProducts] = useState([
      { name: '', price: 0, quantity: 1 }
    ]);
    const [total, setTotal] = useState(0);
    const [overheadFeeType, setOverheadFeeType] = useState('percentage');
    const [overheadFeeValue, setOverheadFeeValue] = useState(0);
  
    const handleInputChange = (event, index) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
          if (name === 'conciergeFeePaid') {
            setConciergeFeePaid(checked);
          } else if (name === 'gfe') {
            setGFE(checked);
          }
        } else if (name === 'clientName') {
          setClientName(value);
        } else if (name === 'dateOfService') {
          setDateOfService(value);
        } else if (name === 'paidByClientCash') {
          setPaidByClientCash(Number(value));
        } else if (name === 'paidByClientCredit') {
          setPaidByClientCredit(Number(value));
        } else if (name === 'comments') {
          setComments(value);
        } else if (name === 'personalDiscount') {
          setPersonalDiscount(Number(value));
        } else if (name === 'tip') {
          setTip(Number(value));
        } else if (name === 'productName') {
          const updatedProducts = [...products];
          updatedProducts[index].name = value;
          setProducts(updatedProducts);
        } else if (name === 'productPrice') {
          const updatedProducts = [...products];
          updatedProducts[index].price = Number(value);
          setProducts(updatedProducts);
        } else if (name === 'productQuantity') {
          const updatedProducts = [...products];
          updatedProducts[index].quantity = Number(value);
          setProducts(updatedProducts);
        }
      };

      
  
    const addProduct = () => {
      setProducts([...products, { name: '', price: 0, quantity: 1 }]);
    };
  
    const removeProduct = (index) => {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    };
  
    const getTotalPaidByClient = () => {
        let totalPaid = (paidByClientCash + paidByClientCredit);
        return totalPaid;
      };
    
      const getTotalProductPrice = (product) => {
        return product.price * product.quantity;
      };
    
      const getTotalProductPriceSum = () => {
        let sum = 0;
        products.forEach((product) => {
          sum += getTotalProductPrice(product);
        });
        return sum;
      };
    
 
      const getTotal = () => {
        const totalProductPriceSum = getTotalProductPriceSum();
        const totalPaidByClient = getTotalPaidByClient();
        const overheadFeeAmount = getOverheadFeeAmount();
        let total = (getTotalPaidByClient() - getTotalProductPriceSum() + overheadFeeAmount + tip) - personalDiscount;
        if (conciergeFeePaid) {
          total -= total * 0.1; // Apply 10% discount
        }
        if (gfe) {
          total -= total * 0.05; // Apply 5% discount
        }
        return total;
      };
      const getOverheadFeeAmount = () => {
        if (overheadFeeType === 'percentage') {
          return getTotalProductPriceSum() * (overheadFeeValue / 100);
        } else {
          return overheadFeeValue;
        }
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the form data (e.g., submit to backend)
      console.log('Client Name:', clientName);
      console.log('Date of Service:', dateOfService);
      console.log('Paid by Client Cash:', paidByClientCash);
      console.log('Paid by Client Credit:', paidByClientCredit);
      console.log('Total paid by client:', getTotalPaidByClient());
      console.log('Comments:', comments);
      console.log('Personal Discount:', personalDiscount);
      console.log('Tip:', tip);
      console.log('Concierge Fee Paid:', conciergeFeePaid);
      console.log('Products:', products);
    };

return (
   <div>
    <Header/>
    <div className="bg-blue-200 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm mx-auto bg-white p-4 rounded-md">
        <form onSubmit={handleSubmit}>
        <label className="mb-2 block">
          Client Name:
          <input
            type="text"
            name="clientName"
            value={clientName}
            onChange={handleInputChange}
            className="w-full mt-1 p-1 border-gray-300 border rounded-md"
          />
        </label>
        <br />
        <label className="mb-2 block">
          Date of Service:
          <input
            type="date"
            name="dateOfService"
            value={dateOfService}
            onChange={handleInputChange}
            className="w-full mt-1 p-1 border-gray-300 border rounded-md"
          />
        </label>
        <br />
        <label className="mb-2 block">
          Paid by Client Cash:
          <input
            type="string"
            name="paidByClientCash"
            value={paidByClientCash}
            onChange={handleInputChange}
            className="w-full mt-1 p-1 border-gray-300 border rounded-md"
          />
        </label>
        <br />
        <label className="mb-2 block">
          Paid by Client Credit:
          <input
            type="string"
            name="paidByClientCredit"
            value={paidByClientCredit}
            onChange={handleInputChange}
            className="w-full mt-1 p-1 border-gray-300 border rounded-md"
          />
        </label>
        <br />
        <label className="block">
          Total paid by client: {getTotalPaidByClient()}
        </label>
        <br />
        <label className="mb-2 block">
          Personal Discount:
          <input
            type="string"
            name="personalDiscount"
            value={personalDiscount}
            onChange={handleInputChange}
            className="w-full mt-1 p-1 border-gray-300 border rounded-md"
          />
        </label>
        <br />
        <label className="mb-2 block">
          Tip:
          <input
            type="string"
            name="tip"
            value={tip}
            onChange={handleInputChange}
            className="w-full mt-1 p-1 border-gray-300 border rounded-md"
          />
        </label>
        <br />
        <label className="block">
          Concierge Fee Paid:
          <input
            type="checkbox"
            name="conciergeFeePaid"
            checked={conciergeFeePaid}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <br />
        <label className="block">
          GFE:
          <input
            type="checkbox"
            name="gfe"
            checked={gfe}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
            Overhead Fee Type:
            <select
              name="overheadFeeType"
              value={overheadFeeType}
              onChange={(event) => setOverheadFeeType(event.target.value)}
              className="w-full mt-1 p-1 border-gray-300 border rounded-md"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </label>
          <label className="block">
            Overhead Fee Value:
            <input
              type="string"
              name="overheadFeeValue"
              value={overheadFeeValue}
              onChange={(event) => setOverheadFeeValue(Number(event.target.value))}
              className="w-full mt-1 p-1 border-gray-300 border rounded-md"
            />
          </label>
          <br />
          <br />
        <br />
        <label className="block">
          Products:
          {products.map((product, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="productName"
                  value={product.name}
                  onChange={(event) => handleInputChange(event, index)}
                  className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Price:
                <input
                  type="string"
                  name="productPrice"
                  value={product.price}
                  onChange={(event) => handleInputChange(event, index)}
                  className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                />
              </label>
              <label className="block mb-2">
                Product Quantity:
                <input
                  type="string"
                  name="productQuantity"
                  value={product.quantity}
                  onChange={(event) => handleInputChange(event, index)}
                  className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                />
              </label>
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Remove Product
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="bg-green-500 text-white px-2 py-1 rounded-md"
          >
            Add Product
          </button>
        </label>
        <br />
        <label className="block">
          Total Product Price Sum: {getTotalProductPriceSum()}
        </label>
        <br />
        <label className="block">
          Total: {getTotal()}
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
)
}