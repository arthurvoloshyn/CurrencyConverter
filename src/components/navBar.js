import React from 'react';
import { NavLink } from 'react-router-dom';

import { Nav } from 'react-bootstrap';

function NavBar() {
  const pathToCurrency = '/';

  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === pathToCurrency;
  };

  const navItems = [
    {
      id: 'home',
      to: pathToCurrency,
      isActive: checkActive,
      text: 'Currency',
    },
    {
      id: 'converter',
      to: '/converter',
      text: 'Converter',
    },
  ];

  return (
    <Nav variant="pills">
      {navItems.map(({ id, isActive, to, text }) => (
        <Nav.Item key={id} className="navLink">
          <NavLink isActive={isActive} to={to}>
            {text}
          </NavLink>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default NavBar;
