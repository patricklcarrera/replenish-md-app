import React, { useState} from 'react';
import {Button , Card, Form} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function Invoice({invoice}){

   console.log(invoice)
   return (
    <div>
       <Card>
            <h2>{invoice.employee_id}</h2>
            <h2>{invoice.product_id}</h2>
            <h2>{invoice.client_id}</h2>
            <h2>{invoice.charge}</h2>
       </Card>
    </div>
   )
}