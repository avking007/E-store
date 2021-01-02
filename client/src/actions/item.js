import axios from 'axios';
import {
  ALL_LOADED,
  ALL_LOAD_FAIL,
  CLEAR_ITEM,
  ITEM_BOUGHT,
  ITEM_BOUGHT_FAIL,
  ITEM_FAIL,
  ITEM_LOADED,
  ITEM_SELL,
  ITEM_SELL_FAIL,
  LOAD_RELEVANT,
  LOAD_RELEVANT_FAIL,
} from './types';
import { set_alert } from './alert';

// get all items
export const get_all = () => async (dispatch) => {
  try {
    const res = await axios.get('/user/items');
    dispatch({ type: ALL_LOADED, payload: res.data.items });
  } catch (error) {
    console.log(error);
    dispatch({ type: ALL_LOAD_FAIL });
  }
};
// get relevant items
export const get_relevant = (city) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = JSON.stringify({ city: city });
    const res = await axios.post('/user/avail_items', data, config);
    dispatch({ type: LOAD_RELEVANT, payload: res.data.items });
  } catch (error) {
    dispatch({ type: LOAD_RELEVANT_FAIL });
  }
};

// sell item
export const sell_item = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = JSON.stringify(formData);
    await axios.post('/user/sell', data, config);
    dispatch({ type: ITEM_SELL });
    dispatch(set_alert('success', 'Item added for sale.'));
  } catch (error) {
    const err = error.response.data;
    if (err) {
      err.forEach((alert) => dispatch(set_alert('danger', alert.msg)));
    }
    dispatch({ type: ITEM_SELL_FAIL });
  }
};

// get one item
export const get_item = (pid) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/${pid}`);
    dispatch({ type: ITEM_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: ITEM_FAIL });
  }
};
// clear item
export const clear_item = () => async (dispatch) => {
  dispatch({ type: CLEAR_ITEM });
};

// buy item
export const buy_item = (pid) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/${pid}/buy`);
    dispatch({ type: ITEM_BOUGHT, payload: res.data.item });
    dispatch(set_alert('success', 'Item successfuly bought.'));
  } catch (error) {
    const err = error.response.data;
    if (err) {
      dispatch(set_alert('danger', err));
    }
    dispatch({ type: ITEM_BOUGHT_FAIL });
  }
};
