import {
  ALL_LOADED,
  ALL_LOAD_FAIL,
  CLEAR_ITEM,
  ITEM_FAIL,
  ITEM_LOADED,
  LOAD_RELEVANT,
  LOAD_RELEVANT_FAIL,
} from '../actions/types';

const initState = {
  loading: true,
  items: [],
  item: null,
  rel_items: [],
};
export default function item(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_LOADED:
      return { ...state, loading: false, items: payload };

    case LOAD_RELEVANT:
      return { ...state, loading: false, rel_items: payload };

    case ITEM_LOADED:
      return { ...state, item: payload };

    case CLEAR_ITEM:
      return { ...state, item: null };

    case ITEM_FAIL:
    case LOAD_RELEVANT_FAIL:
    case ALL_LOAD_FAIL:
    default:
      return state;
  }
}
