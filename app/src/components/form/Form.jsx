import React, { useState } from 'react';
import './Form.css'; // Include CSS for styling

const Form = ({ fields, initialValues = {}, onSubmit }) => {
    // State for form values, initialized with `initialValues` prop
    const [values, setValues] = useState(initialValues);

    // State for form errors, with default empty errors for each field
    const [errors, setErrors] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    // Updates form values as user inputs data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Handles form submission and runs validation
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
        } else {
            setErrors(validationErrors);
        }
    };

    // Validates each field based on validation rules provided in `fields`
    const validate = () => {
        const newErrors = {};
        fields.forEach((field) => {
            if (field.required && !values[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            } else if (field.validate && !field.validate(values[field.name])) {
                newErrors[field.name] = field.errorMessage;
            }
        });
        return newErrors;
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            {fields.map((field) => (
                <div key={field.name} className="form__field">
                    <label htmlFor={field.name} className="form__label">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={values[field.name] || ''}
                        onChange={handleChange}
                        className={`form__input ${errors[field.name] && 'form__input--error'}`}
                    />
                    {errors[field.name] && <span className="form__error">{errors[field.name]}</span>}
                </div>
            ))}
            <button type="submit" className="form__submit">
                Submit
            </button>
        </form>
    );
};

export default Form;
