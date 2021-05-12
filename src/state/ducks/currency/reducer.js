import { SET_CURRENCY } from './types';

const initState = { currency: {} };

const currency = (state = initState, { type, currency }) => {
  switch (type) {
    case SET_CURRENCY:
      return { ...state, currency };
    default:
      return state;
  }
};

export default currency;
