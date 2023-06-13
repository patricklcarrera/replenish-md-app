import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const formInitialState = {
    name: '',
    email: '',
    password: '',
    is_admin: false
};

export default function SignUp() {
    const [formData, setFormData] = useState(formInitialState);
    const { name, email, password, is_admin } = formData;

    function onSubmit(e) {
        e.preventDefault();
        const employee = {
            name,
            email,
            password,
            is_admin
        };

        fetch('/employees')
            .then((response) => response.json())
            .then((employees) => {
                if (isDuplicateEmail(email, employees)) {
                    toast.error('Email already exists');
                } else {
                    fetch('/employees/new', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(employee)
                    }).then((res) => {
                        if (res.ok) {
                            console.log(formData);
                            console.log(employee)
                            setFormData(formInitialState);
                            toast.success('User created successfully');
                        } else {
                            res.json().then((json) => {
                                toast.error('Failed to create user');
                            });
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                        toast.error('An 1 error occurred');
                    });
                }
            }).catch((error) => {
            console.error('Error:', error);
            toast.error('Error fetching employees data');
        });
        setFormData(formInitialState);
    }
    const isDuplicateEmail = (email, employees) => {
        return employees.some((employee) => employee.email === email);
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'is_admin') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: checked,
                }));
            }
        } else if (name === 'name') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        } else if (name === 'email') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        } else if (name === 'password') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }

    };


    return (
        <>
            <Header />
            <h3 className="text-center text-3xl font-semibold my-3">Create an account</h3>
            <form
                onSubmit={onSubmit}
                className="max-w-md mx-auto p-4 bg-blue-100 rounded-lg shadow-md"
            >
                <div className="mb-4">
                    <label htmlFor="name" className="block text-base font-medium text-blue-800">
                        Username
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-base font-medium text-blue-800">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-base font-medium text-blue-800">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="is_admin" className="text-base me-3 font-medium text-blue-800">
                        Do you want to be an Admin ?
                    </label>
                    <input
                        type="checkbox"
                        name="is_admin"
                        value={formData.is_admin}
                        onChange={handleChange}
                        className="p-2 mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Sign up
                </button>
            </form>
        </>
    );
}
