import React, { Fragment, useEffect, useState } from 'react';
import { get_all, get_relevant } from '../../actions/item';
import Product from './Product';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Products({
  user,
  isAuth,
  disp_items: { items, rel_items },
  get_all,
  get_relevant,
}) {
  useEffect(() => {
    get_all();
    if (user && user.city) {
      get_relevant(user.city);
    }
  }, [get_all, user, get_relevant]);

  const [state, setstate] = useState(true);
  const toggleHandler = () => {
    if (state) {
      get_all();
    } else {
      get_relevant(user.city);
    }
    setstate(!state);
  };
  if (!isAuth) {
    return <Redirect to='/login' />;
  }
  return (
    <div className='container'>
      {/* header */}
      <div className='header'>
        <div className='header__srch'>
          <button
            className={`btn btn-${!state ? 'dark' : 'inactive'}`}
            onClick={state ? toggleHandler : null}
          >
            All
          </button>
        </div>
        <div className='header__srch'>
          <button
            className={`btn btn-${state ? 'dark' : 'inactive'}`}
            onClick={!state ? toggleHandler : null}
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
            {rel_items.length > 0 ? (
              <Fragment>
                <Product items={rel_items} />
              </Fragment>
            ) : (
              <Fragment>
                <h3>Nothing available to buy!</h3>
              </Fragment>
            )}
          </div>
        ) : (
          // type all
          <div>
            {items.length > 0 ? (
              <Fragment>
                <Product items={items} />
              </Fragment>
            ) : (
              <Fragment>
                <h3>Nothing available to buy!</h3>
              </Fragment>
            )}
          </div>
        )}
      </div>
      {/* type relevant */}
    </div>
  );
}
const mapper = (state) => ({
  user: state.user.user,
  isAuth: state.user.isAuth,
  disp_items: state.items,
});

export default connect(mapper, { get_all, get_relevant })(Products);
