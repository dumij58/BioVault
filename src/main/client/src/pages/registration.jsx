import { useState } from 'react';
import './registration.css';


function Registration({ onGoHome, onGoLogin }) {
    
    const handleRegister = (e) => {
        e.preventDefault();
        alert('Registration Successful! Redirecting to login.');
        if (onGoLogin) onGoLogin();
    };

    return (
        <div className='reg-container'>
            <h1 className='form-title'>Registration</h1>
            <div className='Reg_container'>
                <form onSubmit={handleRegister} className='reg-form'>
                    <div className='input-wrapper'>
                        <input type='text' className='input-field' placeholder='Full Name' required />
                        <i className="material-symbols-outlined">person</i>
                    </div>
                    <div className='input-wrapper'>
                        <input type='email' className='input-field' placeholder='Email' required />
                        <i className="material-symbols-outlined">mail</i>
                    </div>
                    <div className='input-wrapper'>
                        <input type='password' className='input-field' placeholder='Password' required />
                        <i className="material-symbols-outlined">lock</i>
                    </div>
                    <div className='input-wrapper'>
                        <input type='password' className='input-field' placeholder='Confirm Password' required />
                        <i className="material-symbols-outlined">lock_reset</i>
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
