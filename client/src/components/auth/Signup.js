import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

function Signup({ isAuth, signup }) {
  const [formData, setformData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mob: '',
    city: '',
  });
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    signup(formData);
    setformData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      mob: '',
      city: '',
    });
  };
  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='container'>
      <h1>Signup</h1>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='First Name'
            onChange={(e) => changeHandler(e)}
            value={formData.first_name}
            name='first_name'
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='Last Name'
            onChange={(e) => changeHandler(e)}
            name='last_name'
            value={formData.last_name}
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='Enter Mobile No.'
            onChange={(e) => changeHandler(e)}
            name='mob'
            value={formData.mob}
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='Enter City'
            onChange={(e) => changeHandler(e)}
            name='city'
            value={formData.city}
          />
        </div>

        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='Email Address'
            onChange={(e) => changeHandler(e)}
            name='email'
            value={formData.email}
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='password'
            placeholder='Password'
            onChange={(e) => changeHandler(e)}
            name='password'
            value={formData.password}
          />
        </div>
        <button className='btn btn-primary'> Sign-Up</button>
      </form>
    </div>
  );
}
const mapper = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapper, { signup })(Signup);
