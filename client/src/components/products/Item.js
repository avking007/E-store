import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { get_item, clear_item, buy_item } from '../../actions/item';
import { connect } from 'react-redux';

function Item({
  history,
  match,
  get_item,
  item,
  isAuth,
  clear_item,
  buy_item,
}) {
  const goBackHandler = () => {
    clear_item();
    history.push('/products');
  };
  useEffect(() => {
    get_item(match.params.pid);
  }, [match.params.pid, get_item]);

  const buyHandler = () => {
    if (window.confirm('Are you sure you want to buy this item?')) {
      buy_item(match.params.pid);
      history.push('/dashboard');
    }
  };

  if (!isAuth) {
    return <Redirect to='/login' />;
  }
  return !item ? null : (
    <div className='container medium'>
      <button className='btn btn-primary' onClick={goBackHandler}>
        Go Back
      </button>
      <div className='container__item bg-light'>
        <div className='header'>
          <h2>{item.title}</h2>
        </div>
        <div className='desc'>
          <div className='desc__details'>
            <h4>Details</h4>
            <p>{item.desc}</p>
          </div>
          <div className='desc__dop'>
            <h4>Date of Purchase</h4>
            <p>
              <Moment format='DD/MM/YYYY'>{item.DOP}</Moment>
            </p>
          </div>
          <div className='desc__cp'>
            <h4>Seller's Cost Price</h4>
            <p>Rs {item.cost_price} /-</p>
          </div>
          <div className='desc__sp'>
            <h4>Seller's Price</h4>
            <p>Rs {item.sell_price} /-</p>
          </div>
          <div className='desc__city'>
            <h4>Seller's City</h4>
            <p>{item.city}</p>
          </div>
        </div>
        <button className='btn btn-primary' onClick={buyHandler}>
          Buy
        </button>
      </div>
    </div>
  );
}
const mapper = (state) => ({
  item: state.items.item,
  isAuth: state.user.isAuth,
});
export default connect(mapper, { get_item, clear_item, buy_item })(
  withRouter(Item)
);
