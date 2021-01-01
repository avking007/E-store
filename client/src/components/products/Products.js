import React, { useState } from 'react';
import Product from './Product';

function Products() {
  const [state, setstate] = useState(true);
  const toggleHandler = () => {
    setstate(!state);
  };
  return (
    <div className='container'>
      {/* header */}
      <div className='header'>
        <div className='header__srch'>
          <button
            className={`btn btn-${!state ? 'dark' : 'inactive'}`}
            onClick={state && toggleHandler}
          >
            All
          </button>
        </div>
        <div className='header__srch'>
          <button
            className={`btn btn-${state ? 'dark' : 'inactive'}`}
            onClick={!state && toggleHandler}
          >
            Relevant
          </button>
        </div>
      </div>
      {/* results */}
      <div className='results'>
        {state ? (
          // type relevant
          <div>
            <Product />
            <Product />
          </div>
        ) : (
          // type all
          <div>
            <Product />
          </div>
        )}
      </div>
      {/* type relevant */}
    </div>
  );
}

export default Products;
