import React, {useState} from 'react';
import Header from "./Header";
import {toast} from "react-toastify";

const initialFormState = {
    dateOfService: "",
    paidByClientCash:null,
    paidByClientCredit: null,
    comments: "",
    personalDiscount: null,
    tip: null,
    conciergeFeePaid: false,
    gfe: false,
    overheadFeeType:'percentage',
    overheadFeeValue: null,
    //Product States
    products:[],
    //Retail Product States
    retailProducts:[],
    //Client States
    client: { name: "", id: null},
}
export default function AddInvoices(props) {
    const { productList, clientsList, userProfile } = props
    const [formData, setFormData] = useState(initialFormState);
    const [currentProduct, setCurrentProduct] = useState( {name: '', price: null, quantity: 1})
    const [selectedProduct, setSelectedProduct] =   useState(null);
    const [matchingProducts, setMatchingProducts] = useState([])
    const [currentRetailProduct, setCurrentRetailProduct] = useState( {name: '', price: null, quantity: 1})
    const [selectedRetailProduct, setSelectedRetailProduct] =   useState(null);
    const [matchingRetailProducts, setMatchingRetailProducts] = useState([]);
    // const [currentClient, setCurrentClient] = useState({name:""});
    // const [selectedClient, setSelectedClient] = useState({name:""});
    // const [matchingClients,setMatchingClients] = useState([]);
    const handleInputChange = (event, index) => {
        const {name, value, type, checked} = event.target;
        if (type === 'checkbox') {
            if (name === 'conciergeFeePaid') {

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: checked,
                }));
                // setConciergeFeePaid(checked);
            } else if (name === 'gfe') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: checked,
                }));
            }
        } else if (name === 'dateOfService') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        } else if (name === 'paidByClientCash') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: +value,
            }));
        } else if (name === 'paidByClientCredit') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: +value,
            }));
        } else if (name === 'comments') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        } else if (name === 'personalDiscount') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: +value,
            }));
        } else if (name === 'tip') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: +value,
            }));
        } else if (name ==='overheadFeeType'){
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }else if (name ==='overheadFeeValue'){
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: +value,
            }));
        }
    };
    const removeProduct = (index) => {
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            ["products"]: updatedProducts,
        }));
    };
    const removeRetailProduct = (index) => {
        const updatedProducts = [...formData.retailProducts];
        updatedProducts.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            ["retailProducts"]: updatedProducts,
        }));
    };
    const getTotalPaidByClient = () => {
        let totalPaid = formData.paidByClientCash + formData.paidByClientCredit;
        return totalPaid;
    };
    const getTotalProductPrice = (product) => {
        return (+product.retail_price) * (+product.quantity);
    };
    const getTotalProductPriceSum = () => {
        let sum = 0;
        formData.products.forEach((product) => {
            sum += getTotalProductPrice(product);
        });
        formData.retailProducts.forEach((product) => {
            sum += getTotalProductPrice(product);
        });
        return sum;
    };
    const getTotal = () => {
        const totalProductPriceSum = getTotalProductPriceSum();
        const totalPaidByClient = getTotalPaidByClient();
        const overheadFeeAmount = getOverheadFeeAmount();
        let total = (getTotalPaidByClient() - getTotalProductPriceSum() + overheadFeeAmount + formData.tip) - formData.personalDiscount;
        if (formData.conciergeFeePaid) {
            total -= total * 0.1; // Apply 10% discount
        }
        if (formData.gfe) {
            total -= total * 0.05; // Apply 5% discount
        }
        return total;
    };
    const getOverheadFeeAmount = () => {
        if (formData.overheadFeeType === 'percentage') {
            return getTotalProductPriceSum() * (formData.overheadFeeValue / 100);
        } else {
            return formData.overheadFeeValue;
        }
    };
    /// Product selection functions
    const handleProductNameChange = (e) => {
        const input = e.target.value;
        setCurrentProduct({ name: input, price: 0, quantity: 1 });
        const matchedProducts = productList?.filter(
            (product) => product.name.toLowerCase().includes(input.toLowerCase())
        );
        setMatchingProducts(matchedProducts);
    };
    const handleProductSelection = (selectedProductName) => {
        const selectedProduct = productList?.find(
            (product) => product.name === selectedProductName
        );
        if (selectedProduct) {
            setCurrentProduct({ name: selectedProduct.name, price: selectedProduct.retail_price, quantity: 1 });
            setSelectedProduct(selectedProduct);
            setMatchingProducts([]);
        } else {
            setCurrentProduct({ name: selectedProductName, price: 0, quantity: 1 });
            setSelectedProduct(null);
            setMatchingProducts([]);
        }
    };
    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        setCurrentProduct({ ...currentProduct, quantity });
    };
    const handleAddProduct = () => {
        if (selectedProduct) {
            setCurrentProduct({ name: '', price: 0, quantity: 1 });
            let productToBeAdded =
                {...selectedProduct, quantity: currentProduct.quantity,}
            console.log("productToBeAdded",productToBeAdded)
            setSelectedProduct(null);
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['products']: [...formData.products, productToBeAdded]
            }));
        }
    };

    ///Retail Product selection functions
    const handleRetailProductNameChange = (e) => {
        const input = e.target.value;
        setCurrentRetailProduct({ name: input, price: 0, quantity: 1 });
        const matchedProducts = productList?.filter(
            (product) => product.name.toLowerCase().includes(input.toLowerCase())
        );
        setMatchingRetailProducts(matchedProducts);
    };
    const handleRetailProductSelection = (selectedRetailProductName) => {
        const selectedProduct = productList?.find(
            (product) => product.name === selectedRetailProductName
        );
        if (selectedProduct) {
            setCurrentRetailProduct({ name: selectedProduct.name, price: selectedProduct.retail_price, quantity: 1 });
            setSelectedRetailProduct(selectedProduct);
            setMatchingRetailProducts([]);
        } else {
            setCurrentRetailProduct({ name: selectedRetailProductName, price: 0, quantity: 1 });
            setSelectedRetailProduct(null);
            setMatchingRetailProducts([]);
        }
    };
    const handleRetailQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        setCurrentRetailProduct({ ...currentRetailProduct, quantity });
    };
    const handleAddRetailProduct = () => {
        if (selectedRetailProduct) {
            setCurrentRetailProduct({ name: '', price: 0, quantity: 1 });
            let retailProductToBeAdded =
                {...selectedRetailProduct, quantity: currentProduct.quantity,}
            setSelectedRetailProduct(null);
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['retailProducts']: [...formData.retailProducts, retailProductToBeAdded]
            }));
        }
    };
    //Client Name functions
    // const handleClientNameChange = (e) => {
    //     const input = e.target.value;
    //     setCurrentClient({ name: input});
    //     const matchedClients = clientsList?.filter(
    //         (client) => client.name.toLowerCase().includes(input.toLowerCase())
    //     );
    //     setMatchingClients(matchedClients);
    // };
    // const handleClientSelection = (selectedClientName) => {
    //     const selectedClient = clientsList?.find(
    //         (client) => client.name === selectedClientName
    //     );
    //     if (selectedClient) {
    //         setCurrentClient({ name: selectedClient.name});
    //         setSelectedClient(selectedClient);
    //         setMatchingClients([]);
    //         setFormData((prevFormData) => ({
    //             ...prevFormData,
    //             ['client']: [selectedClient]
    //         }));
    //         // setShowError(false);
    //     } else {
    //         setCurrentClient({ name: selectedClientName});
    //         setSelectedClient(null);
    //         setMatchingClients([]);
    //         // setShowError(true);
    //     }
    // };
    const handleSubmit = (event) => {
        event.preventDefault();
        let invoice = {
            employee_id: userProfile.id,
            product_id: formData.products?formData.products[0].id : 0,
            client_name: '',
            charge:getTotal(),
        }
        console.log("invoice:", invoice)
        fetch("/invoices/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(invoice),
        }).then((res) => {
            if (res.ok) {
                toast.success('Invoice created successfully and the mail has been sent on the email id');
            } else {
                res.json().then((json) => {
                    toast.error('Failed to create Invoice');
                });
            }
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('An error occured.');
        });

        setFormData(initialFormState);
        setCurrentProduct( {name: '', price: 0, quantity: 1})
        setSelectedProduct(null);
        setMatchingProducts([]);
        // setCurrentClient({name:""});
        // setSelectedClient({name:""});
        // setMatchingClients([]);
    };

    return (
        <div>
            <Header userProfile={userProfile}/>
            <div className="bg-blue-200 min-h-screen flex items-center justify-center p-4">
                <form className="max-w-4xl mx-auto bg-white p-4 rounded-md" onSubmit={handleSubmit}>
                    <div className="border rounded-sm p-2 mb-4 flex justify-content-around">
                        <div>
                            <h4>Provider:</h4>
                            <div>{userProfile?.name}</div>
                        </div>
                        <label className=" mb-3 block">
                            Client Name:
                            <input
                                type="text"
                                name="clientName"
                                autoComplete="off"
                                className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                required
                            />
                        </label>
                        <label className="mb-2 block">
                            Date of Service:
                            <input
                                type="date"
                                name="dateOfService"
                                value={formData.dateOfService}
                                onChange={(event)=>handleInputChange(event)}
                                className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                            />
                        </label>
                    </div>
                    <div
                        style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px'}}>
                        <div>
                            <div className="border rounded-sm p-2 mb-4 w-100">
                                <label className="mb-2 block">
                                    Concierge Fee Paid:
                                    <input
                                        type="checkbox"
                                        name="conciergeFeePaid"
                                        checked={formData.conciergeFeePaid}
                                        onChange={(event)=>handleInputChange(event)}
                                        className="ml-1"
                                    />
                                </label>
                                <label className="mb-2 block">
                                    Paid by Client Cash:
                                    <input
                                        type="number"
                                        name="paidByClientCash"
                                        value={formData.paidByClientCash}
                                        min="0"
                                        onChange={(event)=>handleInputChange(event)}
                                        className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                    />
                                </label>
                                <label className="mb-2 block">
                                    Paid by Client Credit:
                                    <input
                                        type="number"
                                        name="paidByClientCredit"
                                        value={formData.paidByClientCredit}
                                        min='0'
                                        onChange={(event)=>handleInputChange(event)}
                                        className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    Total paid by client: {getTotalPaidByClient()}
                                </label>
                            </div>
                            <div className="border rounded-sm p-2 mb-4 w-100">
                                <label className="mb-2 block">
                                    Personal Discount:
                                    <input
                                        type="number"
                                        name="personalDiscount"
                                        value={formData.personalDiscount}
                                        min='0'
                                        onChange={(event)=>handleInputChange(event)}
                                        className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                    />
                                </label>
                                <label className="mb-2 block">
                                    Tip:
                                    <input
                                        type="number"
                                        name="tip"
                                        value={formData.tip}
                                        min='0'
                                        onChange={(event)=>handleInputChange(event)}
                                        className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="border rounded-sm p-2 mb-4">
                                <label className="mb-2 block ">
                                    Comments:
                                    <input
                                        type="string"
                                        name="comments"
                                        value={formData.comments}
                                        onChange={(event)=>handleInputChange(event)}
                                        className="w-full p-1 border-gray-300 border rounded-md"
                                    />
                                </label>
                            </div>
                            <div className="border rounded-sm p-2 mb-4 w-100">
                                <label className="block">
                                    Total: {getTotal()}
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="border rounded-sm p-2 mb-4">
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th>Products Used</th>
                                        <th>Product Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr key={1}>
                                        <td>
                                            <input
                                                type="text"
                                                name="productName"
                                                autoComplete="off"
                                                value={currentProduct.name}
                                                onChange={handleProductNameChange}
                                                className="w-full p-1 border-gray-500 border rounded-md"
                                            />
                                            {matchingProducts?.length > 0 && (
                                                <div className="absolute bg-white w-sm max-h-40 overflow-y-auto rounded-md mt-1 shadow-md">
                                                    {matchingProducts.map((product) => (
                                                        <p
                                                            key={product.id}
                                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => handleProductSelection(product.name)}
                                                        >
                                                            {product.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="productQuantity"
                                                value={currentProduct.quantity}
                                                onChange={handleQuantityChange}
                                                min="1"
                                                className="w-full p-1 border-gray-300 border rounded-md"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="string"
                                                name="productPrice"
                                                autoComplete="off"
                                                value={currentProduct.price}
                                                className="w-full p-1 border-gray-300 border rounded-md"
                                            />
                                        </td>
                                        <td>{currentProduct.quantity * currentProduct.price}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={handleAddProduct}
                                                className={`${
                                                    selectedProduct ? 'text-green-500 border-green-500' : 'text-gray-500 border-gray-500'
                                                } border-2 px-2`}
                                                disabled={!selectedProduct}
                                            >
                                                &#x2713;
                                            </button>

                                        </td>
                                    </tr>
                                    {formData.products.map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <p className="w-full p-1 border-gray-500 border rounded-md my-1"
                                                >{product.name}</p>
                                            </td>
                                            <td>
                                                <p className="w-full p-1 border-gray-500 border rounded-md my-1"
                                                >{product.quantity}</p>
                                            </td>
                                            <td>
                                                <p className="w-full p-1 border-gray-500 border rounded-md my-1"
                                                >{product.retail_price}</p>
                                            </td>
                                            <td>{product.quantity * product.retail_price}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="text-red-500   border-2 border-red-500 px-2"
                                                >
                                                    &#10005;
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border rounded-sm p-2 mb-4">
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th>Retail Products</th>
                                        <th>Product Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr key={1}>
                                        <td>
                                            <input
                                                type="text"
                                                name="productName"
                                                autoComplete="off"
                                                value={currentRetailProduct.name}
                                                onChange={handleRetailProductNameChange}
                                                className="w-full p-1 border-gray-500 border rounded-md"
                                                // required
                                            />
                                            {matchingRetailProducts?.length > 0 && (
                                                <div className="absolute bg-white w-sm max-h-40 overflow-y-auto rounded-md mt-1 shadow-md">
                                                    {matchingRetailProducts.map((product) => (
                                                        <p
                                                            key={product.id}
                                                            className="p-2 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => handleRetailProductSelection(product.name)}
                                                        >
                                                            {product.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="productQuantity"
                                                value={currentRetailProduct.quantity}
                                                onChange={handleRetailQuantityChange}
                                                min="1"
                                                className="w-full p-1 border-gray-300 border rounded-md"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="string"
                                                name="productPrice"
                                                autoComplete="off"
                                                value={currentRetailProduct.price}
                                                className="w-full p-1 border-gray-300 border rounded-md"
                                            />
                                        </td>
                                        <td>{currentRetailProduct.quantity * currentRetailProduct.price}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={handleAddRetailProduct}
                                                className={`${
                                                    selectedRetailProduct ? 'text-green-500 border-green-500' : 'text-gray-500 border-gray-500'
                                                } border-2 px-2`}
                                                disabled={!selectedRetailProduct}
                                            >
                                                &#x2713;
                                            </button>

                                        </td>
                                    </tr>
                                    {formData.retailProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <p className="w-full p-1 border-gray-500 border rounded-md my-1"
                                                >{product.name}</p>
                                            </td>
                                            <td>
                                                <p className="w-full p-1 border-gray-500 border rounded-md my-1"
                                                >{product.quantity}</p>
                                            </td>
                                            <td>
                                                <p className="w-full p-1 border-gray-500 border rounded-md my-1"
                                                >{product.retail_price}</p>
                                            </td>
                                            <td>{product.quantity * product.retail_price}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => removeRetailProduct(index)}
                                                    className="text-red-500   border-2 border-red-500 px-2"
                                                >
                                                    &#10005;
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border rounded-sm p-2 mb-4">
                                <label className="block">
                                    GFE:
                                    <input
                                        type="checkbox"
                                        name="gfe"
                                        checked={formData.gfe}
                                        onChange={(event)=>handleInputChange(event)}
                                        className="ml-2"
                                    />
                                </label>
                                <label className="block">
                                    Overhead Fee Type:
                                    <select
                                        name="overheadFeeType"
                                        value={formData.overheadFeeType}
                                        onChange={(event) => handleInputChange(event)}
                                        className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                    >
                                        <option value="percentage">Percentage</option>
                                        <option value="fixed">Fixed Amount</option>
                                    </select>
                                </label>
                                <label className="block">
                                    Overhead Fee Value:
                                    <input
                                        type="number"
                                        name="overheadFeeValue"
                                        value={formData.overheadFeeValue}
                                        min='0'
                                        onChange={(event) => handleInputChange(event)}
                                        className="w-full mt-1 p-1 border-gray-300 border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    Total Product Price Sum: {getTotalProductPriceSum()}
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
