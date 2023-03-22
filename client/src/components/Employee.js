import React, { useState} from 'react';
import {Button , Card, Form} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function Employee({employee}){
   return (
    <div>
       <Card>
            <h2>Name: {employee.name}</h2>
            <h3>Email: {employee.email}</h3>
            <Button>View Invoices</Button>
       </Card>
    </div>
   )
}