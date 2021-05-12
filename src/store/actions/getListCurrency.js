const getListAction = () => {
  return async dispatch => {
    const API = 'https://www.cbr-xml-daily.ru/daily_json.js';

    const headers = {
      method: 'GET',
    };

    try {
      const response = await fetch(API, headers);
      const data = await response.json();

      if (!data.Valute) dispatch({ type: 'SET_VALUTE', valute: {} });

      dispatch({ type: 'SET_VALUTE', valute: data.Valute });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
};

export default getListAction;
