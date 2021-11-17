import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN } from './Routes';

const PrivateRoute = ({ children, isAuth }) => {
  if (!isAuth) {
    return <Navigate to={LOGIN} />;
  }

  // TODO: check API if session is still valid

  return children
};

export default PrivateRoute;