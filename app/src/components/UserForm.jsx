import React from 'react';
import Form from '../components/form/Form';

const FormUser = () => {
    // Define the fields with labels, types, and validation rules
    const fields = [
        { 
            name: 'username', 
            label: 'Username', 
            type: 'text', 
            required: true, 
            errorMessage: 'Username is required.' 
        },
        { 
            name: 'email', 
            label: 'Email', 
            type: 'email', 
            required: true, 
            validate: (value) => /\S+@\S+\.\S+/.test(value), 
            errorMessage: 'Please enter a valid email address.' 
        },
        { 
            name: 'password', 
            label: 'Password', 
            type: 'password', 
            required: true, 
            errorMessage: 'Password is required.' 
        }
    ];

    const initialValues = {
        username: 'alex123',
        email: 'alex@example.com',
        password: ''
    };

    const handleSubmit = (values) => {
        alert(`Form submitted successfully!\n${JSON.stringify(values, null, 2)}`);
    };

    return (
        <div>
            <h1>Sample Form</h1>
            <Form fields={fields} initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    );
};

export default FormUser;
