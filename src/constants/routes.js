import CurrencyList from '../views/screens/CurrencyList';
import Converter from '../views/screens/Converter';
import Error from '../views/components/Error';

const ROUTES = [
  {
    id: 'Currency',
    path: '/',
    exact: true,
    component: CurrencyList,
  },
  {
    id: 'Converter',
    path: '/converter',
    component: Converter,
  },
  {
    id: 'Error',
    component: Error,
    props: { subTitle: 'Oops! Nothing was found.' },
  },
];

export default ROUTES;
