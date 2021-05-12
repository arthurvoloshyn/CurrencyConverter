import CurrencyList from '../views/CurrencyList';
import Converter from '../views/converter';
import Error from '../components/Error';

const ROUTES = [
  {
    id: 'home',
    path: '/',
    exact: true,
    component: CurrencyList,
  },
  {
    id: 'converter',
    path: '/converter',
    component: Converter,
  },
  {
    id: 'error',
    component: Error,
    props: { subTitle: 'Oops! Nothing was found.' },
  },
];

export default ROUTES;
