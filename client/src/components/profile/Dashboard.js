import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Purchase from './Purchase';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';

function Dashboard({ isAuth, loading, user }) {
  if (!isAuth) {
    return <Redirect to='/login' />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className='container'>
        <h2>Purchase History</h2>
        <br />
        {user && user.buy.length > 0 ? (
          <Purchase purchase={user.buy} />
        ) : (
          <Fragment>
            <h3>No Purchases till now!</h3>
          </Fragment>
        )}
      </div>
    </div>
  );
}
const mapper = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  isAuth: state.user.isAuth,
});

export default connect(mapper)(Dashboard);
