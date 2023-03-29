import React, {useDebugValue, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


function Login({updateEmployee}) {
  const loginState = {
    email: '',
    password: ''
};
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState(loginState);
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch('/login', {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(formData)
      })
      .then(res => {
          if(res.ok){
              res.json().then(user => {
                  updateEmployee(user)
                  navigate('/myprofile')
              })
          } else {
              res.json().then(json => setErrors(json.errors))
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
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" type="text" placeholder="Enter your email" onChange={handleChange}/>
  </Form.Group>
  <br />
  <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" type="password" placeholder="Enter password" onChange={handleChange}/>
  </Form.Group>
  <br />
  <Form.Group >
      <Button type="submit">Login</Button>
  </Form.Group>
</Form>
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to ReplenishMD</h2>
        </div>
        {loginForm}
          </div>
          </div>

         
    )
}

export default Login


