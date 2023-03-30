import { useState, useEffect } from "react";
import Header from './Header';
import Product from './Product'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Search from './Search'


export default function ProductList({filteredProducts, productList, onDeleteProduct, changeSearch, searchTerm ,onSave}){


    return(
        <div >
            <Header/>
            <br/>
            {/* <Search
                searchTerm = {searchTerm}
                changeSearch= {changeSearch}/> */}
                <br/>
            <div class="col-md-12 text-center">
            <a href='/addproduct'type="button" class="btn btn-primary">Add product</a>
        </div>
        <br></br>
            <div class="row row-cols-4 g-5" >
                {productList.map(product=>(
                    <Product product={product} onSave={onSave}onDeleteProduct={onDeleteProduct}/>
                ))}
                
            </div>
        </div>
    )
}