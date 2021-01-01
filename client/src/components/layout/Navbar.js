import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const guestlinks = (
    <ul>
      <li>
        <Link to='/products'>Buy</Link>
      </li>
      <li>
        <Link to='/sell'>Sell</Link>
      </li>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/dashboard'>Profile</Link>
      </li>
    </ul>
  );
  //   const authLinks = (
  //     <ul>
  //       <li>Buy</li>
  //       <li>Sell</li>
  //       <li>Profile</li>
  //     </ul>
  //   );
  return (
    <div>
      <nav className='navbar bg-dark'>
        <Link to='/dashboard'>E-store</Link>
        <Fragment>{guestlinks}</Fragment>
      </nav>
    </div>
  );
}

export default Navbar;
