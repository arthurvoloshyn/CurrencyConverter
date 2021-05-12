import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import ROUTES from '../../constants/routes';

const NavBar = () => {
  const navItems = ROUTES.filter(({ path }) => path);

  return (
    <Nav variant="pills">
      {navItems.map(({ id, path }) => {
        const checkActive = (match, location) => {
          if (!location) return false;
          const { pathname } = location;
          return pathname === path;
        };

        return (
          <Nav.Item key={id} className="navLink">
            <NavLink isActive={checkActive} to={path}>
              {id}
            </NavLink>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default NavBar;
