import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import GoogleLogo from '../assets/img/google.png'

function Signup() {
  return (
    <div className='signup-page'>
      <h1>Sign Up</h1>
      <form className='signup-form'>
        <label htmlFor="name" className="outlined">
          <input className='signup-input' type="text" id="name" required />
          <span data-label="Name"></span>
        </label>
        <label htmlFor="email" className="outlined">
          <input className='signup-input' type="email" id="email" required />
          <span data-label="Email"></span>
        </label>
        <label htmlFor="password" className="outlined">
          <input className='signup-input' type="password" id="password" required />
          <span data-label="Password"></span>
        </label>
      </form>

      <button className='signup-btn'><Link to="/dashboard" className='login-link'>Sign Up</Link></button>
      <p className="signup-link">Already have an account? <Link to="/login" className='signup-link-p'>Log In</Link></p>
      <p className='or-text'> OR </p>
      <div className="google-signup">
        <img className="google-logo" src={GoogleLogo} alt="Google Logo" />
        <p className='google-text'>Sign up with Google</p>
      </div>
      <div className="signup-footer">
        <p>By singing up to create an account | accept company's <span>Terms of use and Privacy Policy</span></p>
      </div>
    </div>
  )
}

export default Signup
