import { setCurrency } from './actions';

// eslint-disable-next-line import/prefer-default-export
export const getCurrencyList = () => {
  return async dispatch => {
    const API = 'https://www.cbr-xml-daily.ru/daily_json.js';

    const headers = {
      method: 'GET',
    };

    try {
      const response = await fetch(API, headers);
      const { Valute: currency = {} } = await response.json();

      dispatch(setCurrency(currency));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
};
