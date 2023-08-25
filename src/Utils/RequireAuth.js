import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';
import PropTypes from 'prop-types';
import { useAuth } from './Auth';

export const RequireAuth = ({ children }) => {
  const [user, setUser] = useState({});
  const auth = useAuth();
  const location = useLocation();

  const login = () => {
    console.log('logging in...');
    const userString = localStorage.getItem('user');
    if (!userString) return;

    let userObject = {};
    userObject = jwt(userString);
    if (!userObject) return;

    userObject.token = userString;
    setUser(userObject);
  };

  if (!auth.user) {
    login();
    if (Object.keys(user).length === 0) {
      return (
        <Navigate
          to='/accounts/login'
          state={{ path: location.pathname + location.search }}
        />
      );
    } else {
      auth.user = user;
    }
  }

  return children;
};
RequireAuth.propTypes = { children: PropTypes.node.isRequired };
