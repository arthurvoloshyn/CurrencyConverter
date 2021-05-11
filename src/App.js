import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import CurrencyList from './views/CurrencyList';
import NavBar from './components/navBar';
import Converter from './views/converter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/index.scss';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        <Route exact path={['/home', '/']} component={CurrencyList} />
        <Route exact path="/converter" component={Converter} />
      </div>
    </HashRouter>
  );
}

export default App;
