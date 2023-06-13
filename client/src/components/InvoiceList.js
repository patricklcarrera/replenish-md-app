import React, { useEffect, useState} from 'react';
import Header from './Header';
import Invoice from './Invoice';

export default function InvoiceList({userProfile}){

    const [invoiceList, setInvoiceList] = useState([]);

    useEffect(() => {
        // Fetch the invoice list from the API
        fetch('/invoices')
            .then((response) => response.json())
            .then((data) => {
                setInvoiceList(data); // Update the state with the fetched data
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Empty dependency array to run the effect only once

    return(
        <div >
            <Header userProfile={userProfile}/>
            <br/>
            <div className="row row-cols-4 g-0" >
                {invoiceList.map(invoice=>(
                    <Invoice invoice={invoice}/>
                ))}

            </div>
        </div>
    )
}