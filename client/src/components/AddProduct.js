import {useState} from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddProduct({addProduct}){
    const initialFormData = {
        name: '',
        product_type: '',
        cost_price: '',
        retail_price: ''
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/products/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(() => {
        addProduct(formData)
        setFormData(initialFormData)
    }) }

    

    const tailwindForm = 
    <>
    <form className="max-w-md mx-auto mt-4 p-4 bg-blue-200 shadow-lg rounded-lg" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
        Product Name
      </label>
      <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" name="name" value={formData.name} onChange={handleChange} />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="product_type">
        Product Type
      </label>
      <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product_type" type="text" name="product_type" value={formData.product_type} onChange={handleChange} />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="cost_price">
       Cost Price
      </label>
      <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cost_price" type="number" name="cost_price" value={formData.cost_price} onChange={handleChange} />
    </div>
    <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="retail_price">
            Retail Price
          </label>
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="retail_price" type="number" name="retail_price" value={formData.retail_price} onChange={handleChange} />
        </div>
    <div className="flex justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Add product      </button>
    </div>
  </form>
  </>
    

    const oldAddProduct = <div><h1 style={{"padding": "1px", "text-align" : "center"}}>Add Product</h1>
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <div style={{"padding": "5px"}}>
            <Form.Control
                type="text"
                as="textarea"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}/>
            </div>
            <div style={{"padding": "5px"}}>
            <Form.Control
                type="text"
                as="textarea"
                name="product_type"
                placeholder='Product Type'
                value={formData.product_type}
                onChange={handleChange}/>
            </div>
            <div style={{"padding": "5px"}}>
            <Form.Control
                type="integer"
                name="cost_price"
                placeholder="Cost Price"
                value={formData.cost_price}
                onChange={handleChange}/>
            </div>
            <div style={{"padding": "5px"}}>
            <Form.Control
                type="integer"
                name="retail_price"
                as="textarea"
                placeholder='Retail Price'
                value={formData.retail_price}
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
    </Form>
    </div> 
    return(
        <div>
            <Header/>
       {tailwindForm}
        </div>
    
    )
}