import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();
  const location = useLocation();
  if (!keycloak.authenticated) {
    // Redirect to the /auth page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;