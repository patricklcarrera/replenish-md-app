import React, {useEffect, useState} from 'react';
import Employee from './Employee'
import Header from './Header';
export default function EmployeeList({userProfile}){
    const [invoiceList, setInvoiceList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);

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
        // Fetch the employee list from the API
        fetch('/employees')
            .then((response) => response.json())
            .then((data) => {
                setEmployeeList(data); // Update the state with the fetched data
            })
            .catch((error) => {
                console.log(error);
            });

    }, []); // Empty dependency array to run the effect only once
    return(
        <div>
            <Header userProfile={userProfile}/>
            <div className="mt-3 mb-3 mx-1 row row-cols-4 g-3">
                {employeeList.map(employee=>(
                    <Employee employee={employee}
                    invoiceList={invoiceList}/>
                ))}
            </div>
        </div>
  
)
}