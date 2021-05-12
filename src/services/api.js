import getApiInstance from '../utils/api';
import API_PATHS from '../constants/apiPaths';

const { BASE_PATH, DAILY_PATH } = API_PATHS;

const api = {
  getCurrencyList: () => getApiInstance(`${BASE_PATH}${DAILY_PATH}`),
};

export default api;
