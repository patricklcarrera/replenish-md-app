import React from 'react';
import Employee from './Employee'
import Header from './Header';
import Invoice from './Invoice';



export default function EmployeeList({employeeList,invoiceList}){

    return(
        <div>
            <Header/>
            <br/>
            <div class="row row-cols-3 g-5">
                {employeeList.map(employee=>(
                    //filter through invoice list by employee id and pass down
                    <Employee employee={employee}
                    invoiceList={invoiceList}/>
                ))}
            </div>
        </div>
  
)
}