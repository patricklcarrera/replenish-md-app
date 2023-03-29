import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
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
        <h1>Signup Here</h1>
        <Form onSubmit={onSubmit}>
        <label>
          Username
          </label>  
          <input type='text' name='name' value={name} onChange={handleChange} />
       
        <label>
         Email
         </label>
        <input type='text' name='email' value={email} onChange={handleChange} />
       
        <label>
         Password
         </label>
        <input type='password' name='password' value={password} onChange={handleChange} />
        {/* <input href='/' type='submit' value='Sign up' /> */}
        <a href='/'><button type='submit' value='Sign up'>Sign up</button></a>
      </Form>
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