import React from 'react';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

function Item({ history }) {
  const goBackHandler = () => {
    history.push('/products');
  };
  return (
    <div className='container medium'>
      <button className='btn btn-primary' onClick={goBackHandler}>
        Go Back
      </button>
      <div className='container__item bg-light'>
        <div className='header'>
          <h2>Heator</h2>
        </div>
        <div className='desc'>
          <div className='desc__details'>
            <h4>Details</h4>
            <p>Working heator</p>
          </div>
          <div className='desc__dop'>
            <h4>Date of Purchase</h4>
            <p>
              <Moment format='DD/MM/YYYY'>2021-01-19</Moment>
            </p>
          </div>
          <div className='desc__cp'>
            <h4>Seller's Cost Price</h4>
            <p>Rs 300 /-</p>
          </div>
          <div className='desc__sp'>
            <h4>Seller's Price</h4>
            <p>Rs 250 /-</p>
          </div>
          <div className='desc__city'>
            <h4>Seller's City</h4>
            <p>Lucknow</p>
          </div>
        </div>
        <button className='btn btn-primary'>Buy</button>
      </div>
    </div>
  );
}

export default withRouter(Item);
