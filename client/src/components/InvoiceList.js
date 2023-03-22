import React from 'react';
import Header from './Header';
import Invoice from './Invoice'


export default function InvoiceList({invoiceList}){


    return(
        <div >
            <Header/>
            <div class="row row-cols-5 g-3" >
                {invoiceList.map(invoice=>(
                    <Invoice invoice={invoice}/>
                ))}
                
            </div>
        </div>
    )
}