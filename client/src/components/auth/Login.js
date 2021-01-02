import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
function Login({ isAuth, login }) {
  const [formData, setformData] = useState({ email: '', password: '' });
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    login(formData);
    setformData({ email: '', password: '' });
  };
  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='container'>
      <h2>Login</h2>

      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <input
            required
            type='text'
            name='email'
            onChange={(e) => changeHandler(e)}
            value={formData.email}
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='password'
            name='password'
            onChange={(e) => changeHandler(e)}
            value={formData.password}
            placeholder='Password'
          />
        </div>

        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  );
}
export const mapper = (state) => ({
  isAuth: state.user.isAuth,
});

export default connect(mapper, { login })(Login);
