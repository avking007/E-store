import axios from 'axios';
import {
  AUTH_ERROR,
  CITY_CHANGE_FAIL,
  CITY_CHANGE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from './types';
import { setAuthToken } from '../utils/setAuthToken';
import { set_alert } from './alert';

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// login user
export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.post('/auth/login', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => {
        dispatch(set_alert('danger', error.msg));
      });
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// signup user
export const signup = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = JSON.stringify(formData);
    const res = await axios.post('/auth/signup', data, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const err = error.response.data.error;
    if (err) {
      err.forEach((error) => {
        dispatch(set_alert('danger', error.msg));
      });
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
  }
};

export const city_change = (city) => async (dispatch) => {
  try {
    const data = JSON.stringify({ city });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put('/user/city_change', data, config);
    dispatch({ type: CITY_CHANGE_SUCCESS, payload: res.data });
    dispatch(set_alert('success', 'City successfully changed'));
  } catch (error) {
    const err = error.response.data.msg;
    if (err) {
      err.forEach((alert) => dispatch(set_alert('danger', alert.msg)));
    }
    dispatch({ type: CITY_CHANGE_FAIL });
  }
};
