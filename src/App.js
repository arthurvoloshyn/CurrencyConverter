import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import ROUTES from './constants/routes';
import NavBar from './components/navBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';

const App = () => (
  <Router>
    <div className="App">
      <NavBar />
      <Switch>
        {ROUTES.map(({ id, path, exact, component: Component, props }) => (
          <Route key={id} exact={exact} path={path}>
            <Component {...props} />
          </Route>
        ))}
      </Switch>
    </div>
  </Router>
);

export default App;
