import React from 'react';
import Header from './Header';
import Invoice from './Invoice'


export default function InvoiceList({invoiceList}){


    return(
        <div >
            <Header/>
            <br/>
            <div class="row row-cols-4 g-5" >
                {invoiceList.map(invoice=>(
                    <Invoice invoice={invoice}/>
                ))}
            </div>
        </div>
    )
}