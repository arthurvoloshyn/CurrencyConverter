import React from 'react';
import { NavLink } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

function NavBar() {
  const currencyText = 'Currency';
  const converterText = 'Converter';

  const pathToCurrency = '/home';
  const pathToConverter = '/converter';

  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === '/' || pathname === pathToCurrency;
  };

  return (
    <Nav variant="pills">
      <Nav.Item className="navLink">
        <NavLink to={pathToCurrency} isActive={checkActive}>
          {currencyText}
        </NavLink>
      </Nav.Item>

      <Nav.Item className="navLink">
        <NavLink to={pathToConverter}>{converterText}</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
