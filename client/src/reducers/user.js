import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from '../actions/types';

const initState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: true,
  user: null,
};

export default function user(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload, isAuth: true, loading: false };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, isAuth: true, token: payload.token };

    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return { isAuth: false, loading: true, user: null, token: null };

    default:
      return state;
  }
}
