import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Attempting to log in with:', formData);
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      console.log('Response from login:', responseData);
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        setError(responseData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Attempting to sign up with:', formData);
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
      console.log('Response from signup:', responseData);
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        setError(responseData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (state === 'Login') {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === 'Sign up' && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type='text'
              placeholder='Your Name'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type='text'
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type='password'
            placeholder='Your Password'
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait...' : 'Continue'}
        </button>
        {state === 'Sign up' ? (
          <p className='loginsignup-login'>
            Already have an account?
            <span onClick={() => setState('Login')}>Login Here</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Create an account?
            <span onClick={() => setState('Sign up')}>Click Here</span>
          </p>
        )}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
