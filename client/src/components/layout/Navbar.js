import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

function Navbar({ isAuth, loading, logout }) {
  const logoutHandler = () => {
    logout();
  };
  const guestlinks = (
    <ul>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <Link to='/products'>Buy</Link>
      </li>
      <li>
        <Link to='/sell'>Sell</Link>
      </li>
      <li>
        <Link to='/dashboard'>Profile</Link>
      </li>
      <li>
        <Link to='/' onClick={logoutHandler}>
          Logout
        </Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className='navbar bg-dark'>
        <Link to='/dashboard'>
          <i className='fas fa-shopping-basket' /> {'  '}E-store
        </Link>
        {isAuth && !loading ? (
          <Fragment>{authLinks}</Fragment>
        ) : (
          <Fragment>{guestlinks}</Fragment>
        )}
      </nav>
    </div>
  );
}
export const mapper = (state) => ({
  isAuth: state.user.isAuth,
  loading: state.user.loading,
});
export default connect(mapper, { logout })(Navbar);
