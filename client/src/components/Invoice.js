import React, { useState} from 'react';
import {Button , Card, Form} from 'react-bootstrap';
import CustomModal from "./CustomModal";
export default function Invoice({invoice}){
    const [modalShow, setModalShow] = useState(false);
    function handleClick () {
        setModalShow(!modalShow)
    }

   const tailwindInvoiceCard =
       <Card className='text-center' border="info" style={{ width: '18rem' }}>
           <Card.Header as="h5">Invoice Id {invoice.id}</Card.Header>
           <Card.Body className=''>
               <Card.Title className='mb-3'>Employee: {invoice.employee.name}</Card.Title>
               <Button onClick={handleClick} variant="info">See More Details</Button>
               <CustomModal
                   show={modalShow}
                   onHide={handleClick}
                   invoiceData={invoice}
               />
           </Card.Body>
       </Card>
   return (
      <>
    <div className='p-4'>
       {tailwindInvoiceCard}
    </div>
    </>
   )
}
