import { useState } from 'react';
import './registration.css';
import { registerApi } from '../service/authApi';


function Registration({ onGoHome, onGoLogin }) {
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: '', institution: '', designation: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (form.password !== form.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            await registerApi({
                name: form.name,
                email: form.email,
                password: form.password,
                institution: form.institution,
                designation: form.designation,
            });
            if (onGoLogin) onGoLogin();
        } catch (error) {
            setErrorMessage(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className='reg-container'>
            <h1 className='form-title'>Registration</h1>
            <div className='Reg_container'>
                <form onSubmit={handleRegister} className='reg-form'>
                    {errorMessage ? <p className="error-message" role="alert">{errorMessage}</p> : null}
                    <div className='input-wrapper'>
                        <input type='text' name='name' className='input-field' placeholder='Full Name' value={form.name} onChange={handleChange} required />
                        <i className="material-symbols-outlined">person</i>
                    </div>
                    <div className='input-wrapper'>
                        <input type='email' name='email' className='input-field' placeholder='Email' value={form.email} onChange={handleChange} required />
                        <i className="material-symbols-outlined">mail</i>
                    </div>
                    <div className='input-wrapper'>
                        <input type='password' name='password' className='input-field' placeholder='Password' value={form.password} onChange={handleChange} minLength={8} required />
                        <i className="material-symbols-outlined">lock</i>
                    </div>
                    <div className='input-wrapper'>
                        <input type='password' name='confirmPassword' className='input-field' placeholder='Confirm Password' value={form.confirmPassword} onChange={handleChange} minLength={8} required />
                        <i className="material-symbols-outlined">lock_reset</i>
                    </div>
                    <div className='input-wrapper'>
                        <select name="institution" id="institution" className='input-field select-field' value={form.institution} onChange={handleChange} required>
                            <option value="" disabled hidden>Select Institution</option>
                            <option value="col">University of Colombo</option>
                            <option value="math">University of Moratuwa</option>
                            <option value="physics">University of Peradeniya</option>
                            <option value="chemistry">University of Jaffna</option>
                        </select>
                        <i className="material-symbols-outlined">apartment</i>
                    </div>

                    <div className='input-wrapper'>
                        <select name="designation" id="designation" className='input-field select-field' value={form.designation} onChange={handleChange} required>
                            <option value="" disabled hidden>Select Designation</option>
                            <option value="Professor">Professor</option>
                            <option value="lecturer">Senior Lecturer / Lecturer</option>
                            <option value="postdoctoral_researcher">Postdoctoral Researcher</option>
                            <option value="research_assistant">Research Assistant</option>
                            <option value="graduate_undergraduate_researcher">Graduate / Undergraduate Researcher</option>
                        </select>
                        <i className="material-symbols-outlined">work</i>
                    </div>

                    <button type='submit' className='reg-button'>Register</button>
                </form>
            </div>
            
            <p className='signup-text' style={{ marginTop: '1.5rem' }}>
                Already have an account? <button type='button' className='text-link-button' onClick={(e) => { e.preventDefault(); if (onGoLogin) onGoLogin(); }}>Login</button>
            </p>
            <p className='back-home-text' style={{ textAlign: 'center', marginTop: '1rem' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); if (onGoHome) onGoHome(); }} style={{ color: '#888', fontSize: '0.9rem' }}>
                    Back to Home
                </a>
            </p>
        </div>
    );
}

export default Registration;
