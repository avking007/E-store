import React, { Fragment } from 'react';
import loader from './loader.gif';

function Spinner() {
  return (
    <Fragment>
      <div className='container'>
        <center>
          <img
            src={loader}
            style={{
              width: '200px',
              display: 'block',
            }}
            alt='Loading...'
          />
        </center>
      </div>
    </Fragment>
  );
}

export default Spinner;
