import { REMOVE_ALERT, SET_ALERT } from './types';
import { v4 } from 'uuid';

export const set_alert = (type, message) => async (dispatch) => {
  const id = v4();
  dispatch({ type: SET_ALERT, payload: { message, type, id } });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
