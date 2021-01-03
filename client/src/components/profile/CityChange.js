import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { city_change } from '../../actions/auth';

function CityChange({ isAuth, user, city_change }) {
  const [city, setcity] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    city_change(city);
    setcity('');
  };
  const changeHandler = (e) => {
    setcity(e.target.value);
  };
  if (!isAuth) {
    return <Redirect to='login' />;
  }
  return (
    <div>
      <div className='container'>
        <Link to='/dashboard' className='btn btn-primary city_change'>
          Go Back
        </Link>
        <br />
        <br />
        <h1 className='large text-primary'>Change your city</h1>
        <hr />
      </div>
      <div className='container'>
        <form className='form' onSubmit={submitHandler}>
          <div className='form-group'>
            <input
              type='text'
              disabled
              value={`Current city : ${user && user.city}`}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='city'
              value={city}
              onChange={(e) => changeHandler(e)}
              required
              placeholder='Enter new city'
            />
          </div>
          <button className='btn btn-primary'>Change city</button>
        </form>
      </div>
    </div>
  );
}
const mapper = (state) => ({
  isAuth: state.user.isAuth,
  user: state.user.user,
});

export default connect(mapper, { city_change })(CityChange);
