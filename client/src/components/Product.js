import React, { useState} from 'react';
import {Button , Card, Form} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function Employee({product}){

   const updatePopover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Edit Product</Popover.Header>
        <Popover.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
               type="text"
               placeholder="Edit Name"
               name="name"
               // value={edit?.comment}
               // onChange={handleChange}
            />
            <Form.Label>Cost Price</Form.Label>
            <Form.Control
               type="integer"
               placeholder="$ Edit Price"
               name="cost_price"
               // value={edit?.comment}
               // onChange={handleChange}
            />
            <Form.Label>Retail Price</Form.Label>
            <Form.Control
               type="integer"
               placeholder="$ Retail Price"
               name="retail_price"
               // value={edit?.comment}
               // onChange={handleChange}
            />
            <br></br>
            <Button>Done editing</Button>
            
          </Form.Group>
        </Popover.Body>
      </Popover>
    );

   return (
    <div>
       <Card>
            <p>Product: {product.name}</p>
            <p>Type: {product.product_type}</p>
            <p>Cost Price: ${product.cost_price}</p>
            <p>Retail Price: ${product.retail_price}</p>
            <Button>Remove Product</Button>
            <OverlayTrigger trigger="click" placement="right" overlay={updatePopover}>
    <Button variant="success">Update Product</Button>
  </OverlayTrigger>
       </Card>
    </div>
   )
}