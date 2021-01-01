import React from 'react';

function Product() {
  return (
    <div className='container bg-primary'>
      <div className='container__left'>
        {/* Title */}
        <h2>Heator</h2>
        {/* Desc */}
        <small>Details : Working Heator</small>
      </div>
      <div className='container__right'>
        <h3>Price</h3>
        <p>Rs: 500</p>
      </div>
    </div>
  );
}

export default Product;
