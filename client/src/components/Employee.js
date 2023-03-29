import React, { useState} from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Form, Popover, Button, Card } from 'react-bootstrap';

export default function Employee({employee,invoiceList}){







   //move 14-16 to a component then map over the new filtered invoice list
   const showInvoicePopover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Invoices</Popover.Header>
        <Popover.Body>
            <Card.Body>Employee: {invoiceList[0].employee.name}</Card.Body>
            <Card.Body>Client name: {invoiceList[0].client.name}</Card.Body>
            <Card.Body>Charge: {invoiceList[0].charge}</Card.Body>
        </Popover.Body>
      </Popover>
    );

        
  const tailWindEmployeeCard =  
  <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
     <h2 className="text-blue-800 text-xl font-bold mb-2">Employee: {employee.name}</h2>
     <p className="text-blue-700">Email: {employee.email}</p>
     <OverlayTrigger trigger="click" placement="right" overlay={showInvoicePopover}>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Show invoices</button>
     </OverlayTrigger>
</div>




   return (
    <div>
       {/* <Card>
            <h2>Name: {employee.name}</h2>
            <h3>Email: {employee.email}</h3>
            <OverlayTrigger trigger="click" placement="right" overlay={showInvoicePopover}>
    <Button variant="success">Show invoices</Button>
    </OverlayTrigger>
       </Card> */}
       {tailWindEmployeeCard}
    </div>
   )
}