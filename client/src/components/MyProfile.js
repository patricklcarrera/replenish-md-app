import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Header from './Header'
import {Button, Card} from "react-bootstrap";
function UserPage({userProfile}){
    const [employee, setEmployee] = useState()
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(false)
    
    const params = useParams()
    const {id} = params
    useEffect(()=>{
        fetch(`/employees/${id}`)
        .then(res => {
            if(res.ok){
                res.json().then(employee => {
                    setEmployee(employee)
                    setLoading(false)
                })
            }else {
                res.json().then(data => setErrors(data.error))
            }
        })
       
    },[])

    if(loading) return <Header></Header>
    if(errors) return <h1>{errors}</h1>

    return (
        <div>
            <Header userProfile={userProfile}/>
            <br/>
            <h1 className="text-4xl font-bold text-center text-blue-600">{employee.name}</h1>
            <br/>
            <h2 className="text-4xl font-bold text-center text-blue-400">My invoices</h2>
            <br/>
            <ul className=" mx-1 mb-3 row row-cols-4 g-3">
                {employee.invoices.map(invoice => {
                    return <li>
                    <Card className='text-center' border="info" style={{ width: '18rem' }}>
                        <Card.Header as="h5">Invoice ID {invoice.id}</Card.Header>
                        <Card.Body className=''>
                            <Card.Title className='mb-2'>Client name: {invoice.client_name}</Card.Title>
                            <Card.Title className='mb-2'>Product name: {invoice.product_name}</Card.Title>
                            <Card.Title className='mb-2'>Charge: {invoice.charge}</Card.Title>

                        </Card.Body>
                    </Card>
                    </li>
                    }
                )
                }
            </ul>
        </div>
    )
}

export default UserPage