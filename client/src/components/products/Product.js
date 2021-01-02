import React from 'react';
import { withRouter } from 'react-router-dom';
function Product({ items, history }) {
  const OpenItemHandler = (pid) => {
    history.push(`/product/${pid}`);
  };

  const disp = items.map((item) => (
    <div
      className='container bg-primary'
      key={item._id}
      onClick={() => OpenItemHandler(item._id)}
    >
      <div className='container__left'>
        {/* Title */}
        <h2>{item.title}</h2>
        {/* Desc */}
        <small>Details : {item.desc}</small>
        <small>Available in : {item.city}</small>
      </div>
      <div className='container__right'>
        <h3>Price</h3>
        <p>Rs: {item.sell_price}</p>
      </div>
    </div>
  ));
  return disp;
}

export default withRouter(Product);
