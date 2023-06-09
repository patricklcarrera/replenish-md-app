import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Header from './Header'
function UserPage(){
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
            <Header/>
            <br/>
            <h1 className="text-4xl font-bold text-center text-blue-600">{employee.name}</h1>
            <br/>
            <h2 className="text-4xl font-bold text-center text-blue-400">My invoices</h2>
            <br/>
            <ul>
                {employee.invoices.map(invoice => (
                <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-blue-800 text-xl font-bold mb-2">Invoice ID: {invoice.id}</h2>
                
                
                {/* <p className="text-blue-700">Client name: {invoice.employee.name}</p>
                <p className="text-blue-700">Product: {invoice.product_id}</p> */}
                <p className="text-blue-700">Charge: {invoice.charge}</p>
                <p className="text-blue-700">Product name: {invoice.product_name}</p>
                <p className="text-blue-700">Client name: {invoice.client_name}</p>
            

           </div>
                ))}
            </ul>
        </div>
    )
}

export default UserPage