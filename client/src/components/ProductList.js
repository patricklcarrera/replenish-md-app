import React from 'react';
import Header from './Header';
import Product from './Product'


export default function ProductList({productList}){


    return(
        <div >
            <Header/>
            <div class="row row-cols-4 g-5" >
                {productList.map(product=>(
                    <Product product={product}/>
                ))}
                
            </div>
        </div>
    )
}