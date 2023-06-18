import React, { useEffect, useState } from 'react';
import Header from './Header';
import Invoice from './Invoice';

export default function InvoiceList({userProfile}){
    const [finalizedInvoiceList, setFinalizedInvoiceList] = useState([]);
    const [nonFinalizedInvoiceList, setNonFinalizedInvoiceList] = useState([]);

    useEffect(() => {
        const fiInvoiceList = [];
        const nonFiInvoiceList = [];
        // Fetch the invoice list from the API
        fetch('/invoices')
            .then((response) => response.json())
            .then((data) => {
                data.forEach(invoice=>{
                    if (invoice.is_finalized == true) {
                        fiInvoiceList.push(invoice);
                    } else {
                        nonFiInvoiceList.push(invoice);
                    }
                });
                setFinalizedInvoiceList(fiInvoiceList);
                setNonFinalizedInvoiceList(nonFiInvoiceList);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Empty dependency array to run the effect only once

    return(
        <div >
            <Header userProfile={userProfile}/>
            <br/>
            <div>
                <h2 className='text-center'>Finalized Invoices:</h2>
                <hr/>
                <div className="row row-cols-4 g-0" >
                    {finalizedInvoiceList.map(invoice=>(
                        <Invoice invoice={invoice}/>
                    ))}

                </div>
            </div>
            <br/>
            <div>
                <h2 className='text-center'>Non Finalized Invoices:</h2>
                <hr/>
                <div className="row row-cols-4 g-0" >
                    {nonFinalizedInvoiceList.map(invoice=>(
                        <Invoice invoice={invoice}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
