import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useLocation, Navigate } from 'react-router-dom';

const Auth = () => {
  const { keycloak, initialized } = useKeycloak();
  console.log(keycloak)
  if (!initialized) {
    return <div>Loading...</div>;
  }

  const handleLogin = () => {
    keycloak.login();
  };

  const handleRegister = () => {
    keycloak.register();
  };

  if (keycloak.authenticated) {
    const from = location.state?.from || '/'; // Если нет состояния, перенаправляем на главную
    return <Navigate to={from} replace />;
  }

  return (
    <div>
      {keycloak.authenticated ? (
        <div>Welcome, {keycloak.tokenParsed?.preferred_username}</div>
      ) : (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Auth;