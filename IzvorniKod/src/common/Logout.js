import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { HOME } from '../Routes';

function Logout({ logout: logoutUser }) {
  useEffect(() => {
    window.location.href = HOME;
    logoutUser();

    // We use an empty array on purpose - this runs only when the component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Navigate to={HOME} />;
}

export default Logout;