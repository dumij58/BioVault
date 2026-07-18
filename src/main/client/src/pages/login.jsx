import { useEffect } from 'react';
import { useState } from 'react';


function Login({ email, setEmail, password, setPassword, handleLogin, errorMessage, onGoRegistration }) {
  const handleGoogleLogin = () => {
    window.alert('Google login is ready for integration. Connect your Google OAuth provider here.');
  };

  const handleForgotPassword = () => {
    window.alert('Forgot password support: contact your lab administrator to reset your account.');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (onGoRegistration) {
      onGoRegistration();
    }
  };

  return (
    <div className="login-container">
      <h1 className="form-title">Sign in </h1>

      <form className="login-form" onSubmit={handleLogin}>
        {errorMessage ? <p className="error-message" role="alert">{errorMessage}</p> : null}
        <div className="input-wrapper">
          <i className="material-symbols-outlined" aria-hidden="true">mail</i>
          
          <input
            className="input-field"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="input-wrapper">
          <i className="material-symbols-outlined" aria-hidden="true">lock</i>
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="button" className="forgot-pass-link" onClick={handleForgotPassword}>Forgot password?</button>
        <p className='seperator'><span>or</span></p>
          
        <div className="login-form__actions">
          <button type="button" className="social-button social-button--google" onClick={handleGoogleLogin}>
            <span className="social-button__icon" aria-hidden="true">G</span>
            <span>Continue with Google</span>
          </button>
        <button type="submit" className="login-button">Login</button>
        </div>

        <p className="register-prompt">
            Not registered yet?
            <button type="button" className="register-link" onClick={handleRegister}>Register here</button>
        </p>

        
      </form>
    </div>
  );
}

export default Login;