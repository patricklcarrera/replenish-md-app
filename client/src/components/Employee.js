import React, {useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import CustomEmployeeModel from "./CustomEmployeeModel";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function Employee({employee, invoiceList}){
    const [employeeInvoices, setEmployeeInvoices] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const filteredInvoices = invoiceList.filter(
            (invoice) => invoice.employee.id === employee.id
        );
        setEmployeeInvoices(filteredInvoices);
    }, [invoiceList, employee]);

    console.log("employeeInvoices",employeeInvoices)
        
    const tailWindEmployeeCard =
        <Card className='text-center' border="info" style={{ width: '18rem' }}>
        <Card.Header as="h5">Employee Id {employee.id}</Card.Header>
        <Card.Body className=''>
            <Card.Title className='mb-3'>Employee: {employee.name}</Card.Title>
            {employeeInvoices.length > 0 ? <Button onClick={handleClick} variant="info">Show Invoices</Button> : <p>No Invoices</p>}
            {employeeInvoices.length > 0 ?
            <CustomEmployeeModel
                show={modalShow}
                onHide={handleClick}
                employeeInvoices={employeeInvoices}
                EmployeeId = {employee.id}
            /> : <></>}
            <Button onClick={sendResetPasswordLink} variant="info" style={{width: "100px", height: "30px"}}>Send Reset Password Link</Button>
        </Card.Body>
    </Card>

    function handleClick () {
        setModalShow(!modalShow)
    }

    function sendResetPasswordLink () {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure you want to send the reset password mail to ${employee.name}`,
            buttons: [
                  {
                    label: 'Yes',
                    onClick: () => {fetch("employees/"+employee.id+"/send_reset_password_link")}
                  },
                  {
                    label: 'No',
                    onClick: () => console.log('Click No')
                  }
                ]
              });
        }
   return (
    <div>
        {employeeInvoices ? tailWindEmployeeCard : <div>Loading</div>}
    </div>
   )
}
