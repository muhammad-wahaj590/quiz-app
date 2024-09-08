import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import GoogleLogo from '../assets/img/google.png'

function Login() {
  return (
    <>
    <div className='login-page'>
      <h1>Log In</h1>
      <form className='login-form'>
        <label htmlFor="Email" className="outlined">
          <input className='login-input' type="text" id="Email" required />
          <span data-label="Enter your Email"></span>
        </label>
        <label htmlFor="password" className="outlined">
          <input className='login-input' type="password" id="password" required />
          <span data-label="Password"></span>
        </label>
      </form>

      <button className='login-btn'><Link to="/dashboard" className='login-link'>Login</Link></button>
      <p className='or-text'> OR </p>
      <div className="google-login">
        <img className="google-logo" src={GoogleLogo} alt="Google Logo" />
        <p className='google-text'>Continue with Google</p>
      </div>
      <div className="login-footer">
        <p>Don't have an account? <Link to='/signup' className='footer-link'>Sign Up</Link></p>
      </div>
    <Link to="/" className='login-back'>Go Back</Link>
    </div>
    </>
  )
}

export default Login
