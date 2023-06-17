import { useState, useEffect } from "react";
import Header from './Header';
import Product from './Product'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Search from './Search'


export default function ProductList({filteredProducts, onDeleteProduct, changeSearch, searchTerm ,onSave, userProfile}){
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        // Fetch the invoice list from the API
        fetch('/products')
            .then((response) => response.json())
            .then((data) => {
                setProductList(data); // Update the state with the fetched data
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Empty dependency array to run the effect only once

    return(
        <div >
            <Header userProfile={userProfile}/>
            <br/>
            {/* <Search
                searchTerm = {searchTerm}
                changeSearch= {changeSearch}/> */}
                <br/>
            <div class="col-md-12 text-center">
            {/*<a href='/addproduct'type="button" class="btn btn-primary">Add product</a>*/}
                {userProfile?.is_admin && (
                    <div class="col-md-12 text-center">
                        <a href='/addproduct' type="button" class="btn btn-primary">Add product</a>
                    </div>
                )}
        </div>
        <br></br>
            <div class="row row-cols-4 g-5" >
                {productList.map(product=>(
                    <Product isAdmin={userProfile?.is_admin} product={product} onSave={onSave}onDeleteProduct={onDeleteProduct}/>
                ))}
                
            </div>
        </div>
    )
}
