import React, { useState} from 'react';
import {Button , Card, Form} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InvoiceList from './InvoiceList';

export default function Invoice({invoice}){

   console.log(invoice)

   const tailwindInvoiceCard =  
   <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-blue-800 text-xl font-bold mb-2">Invoice id {invoice.id}</h2>
      <p className="text-blue-700">Employee: {invoice.employee.name}</p>
      <p className="text-blue-700">Product: {invoice.product.name}</p>
      <p className="text-blue-700">Client: {invoice.client.name}</p>
      <p className="text-blue-700">Charge: ${invoice.charge}</p>
 </div>

   return (
    <div>
       {/* <Card>
            <p>Employee: {invoice.employee.name}</p>
            <p>Product: {invoice.product.name}</p>
            <p>Client: {invoice.client.name}</p>
            <p>Charge: ${invoice.charge}</p>
       </Card> */}
       {tailwindInvoiceCard}
    </div>
   )
}