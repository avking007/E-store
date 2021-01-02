import axios from 'axios';
import {
  ALL_LOADED,
  ALL_LOAD_FAIL,
  CLEAR_ITEM,
  ITEM_FAIL,
  ITEM_LOADED,
  ITEM_SELL,
  ITEM_SELL_FAIL,
  LOAD_RELEVANT,
  LOAD_RELEVANT_FAIL,
} from './types';

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
  } catch (error) {
    console.log(error.response.data);
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
