import React from 'react';
import Header from './Header';
import Invoice from './Invoice'


export default function InvoiceList({invoiceList}){


    return(
        <div >
            <Header/>
            <br/>
            <div class="row row-cols-4 g-3" >
                {invoiceList.map(invoice=>(
                    <Invoice invoice={invoice}/>
                ))}
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
 </div>

            </div>
        </div>
    )
}