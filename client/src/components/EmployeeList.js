import React from 'react';
import Employee from './Employee'
import Header from './Header';


export default function EmployeeList({employeeList}){


    return(
        <div>
            <Header/>
            <div class="row row-cols-4 g-3">
                {employeeList.map(employee=>(
                    <Employee employee={employee}/>
                ))}
            </div>
        </div>
  
)
}