import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ROUTES from './constants/routes';
import MainLayout from './layouts/Main';

import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';

const App = () => (
  <MainLayout>
    <Switch>
      {ROUTES.map(({ id, path, exact, component: Component, props }) => (
        <Route key={id} exact={exact} path={path}>
          <Component {...props} />
        </Route>
      ))}
    </Switch>
  </MainLayout>
);

export default App;
