import {
  AUTH_ERROR,
  CITY_CHANGE_FAIL,
  CITY_CHANGE_SUCCESS,
  ITEM_BOUGHT,
  ITEM_BOUGHT_FAIL,
  ITEM_SELL_FAIL,
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
    case ITEM_BOUGHT:
      return {
        ...state,
        user: { ...state.user, buy: [...state.user.buy, payload] },
      };

    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return { isAuth: false, loading: true, user: null, token: null };

    case CITY_CHANGE_SUCCESS:
      return { ...state, user: payload };

    case CITY_CHANGE_FAIL:
    case ITEM_BOUGHT_FAIL:
    case ITEM_SELL_FAIL:
    default:
      return state;
  }
}
