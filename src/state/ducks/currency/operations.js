import api from '../../../services/api';
import { setCurrency } from './actions';

// eslint-disable-next-line import/prefer-default-export
export const getCurrencyList = () => async dispatch => {
  try {
    const { Valute: currency = {} } = await api.getCurrencyList();

    dispatch(setCurrency(currency));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
