import React, { useState } from 'react';

function Login() {
  const [login, setlogin] = useState({ email: '', password: '' });
  const changeHandler = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(login);
    setlogin({ email: '', password: '' });
  };
  return (
    <div className='container'>
      <h2>Login</h2>

      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <input
            type='text'
            name='email'
            onChange={(e) => changeHandler(e)}
            value={login.email}
            placeholder='Email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            onChange={(e) => changeHandler(e)}
            value={login.password}
            placeholder='Password'
          />
        </div>

        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  );
}

export default Login;
