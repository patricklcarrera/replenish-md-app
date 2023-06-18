import React, {useDebugValue, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {toast} from "react-toastify";
function ResetPassword() {
    const resetPasswordState = {
      password: '',
      confirmPassword: '',
    };
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState(resetPasswordState);
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("/employees/1/reset_password", {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(formData)
      })
      .then(res => {
        if(res.ok){
            res.json().then(user => {
                toast.success('Successfully Logged In');
                navigate('/myprofile')
            })
        } else if(res.status == 302)  {
          toast.error('Password does not match, please try again.');
        }
      })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const loginForm = 
    <Form onSubmit={handleSubmit}>
    <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" required value={formData.password} placeholder="Enter your email" onChange={handleChange}/>
    </Form.Group>
    <br />
    <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control name="confirmPassword" type="password" required value={formData.confirmPassword} placeholder="Enter password" onChange={handleChange}/>
    </Form.Group>
    <br />
    <Form.Group >
        <Button type="submit">Save Password and Login</Button>
    </Form.Group>
  </Form>
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to ReplenishMD</h2>
          {loginForm}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
