import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from './Header'
import { Form } from 'react-bootstrap'

export default function SignUp() {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    })
    const [errors, setErrors] = useState([])
    const history = useNavigate()

    const {name, email, password} = formData

    function onSubmit(e){
        e.preventDefault()
        const employee = {
            name,
            email,
            password
        }
       
        fetch(`/employees/new`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(employee)
        })
     
       
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
      }
      
    return (
        <> 
        <Header/>
        <h1 align="center">Create an account</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 bg-blue-100 rounded-lg shadow-md">
        <label htmlFor="username" className="block text-base font-medium text-blue-800">
          Username
          </label>  
          <input type='text' name='name' value={name} onChange={handleChange} />
       
          <label htmlFor="" className="block text-base font-medium text-blue-800">
         Email
         </label>
        <input type='text' name='email' value={email} onChange={handleChange} />
       
        <label htmlFor="password" className="block text-base font-medium text-blue-800">
         Password
         </label>
        <input type='password' name='password' value={password} onChange={handleChange} />
        {/* <input href='/' type='submit' value='Sign up' /> */}
        <a href='/'><button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" value='Sign up'>Sign up</button></a>
      </form>
        </>
    )
}


// .then(res => {
//   if(res.ok){
//       res.json().then(user => {
//           history.push(`/employees/${employee.id}`)
//       })
//   }else {
//       res.json().then(json => setErrors(Object.entries(json.errors)))
//   }
// })