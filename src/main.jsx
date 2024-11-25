import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';

// Настройка Keycloak
const keycloak = new Keycloak({
  url: 'http://localhost:8080', 
  realm: 'test-realm',
  clientId: 'myclient'
});

const onKeycloakEvent = (event, error) => {
  console.log('onKeycloakEvent', event, error);
};

const onKeycloakTokens = (tokens) => {
  console.log('onKeycloakTokens', tokens);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
      initOptions={{ onLoad: 'check-sso' }}
    >
      <App />
    </ReactKeycloakProvider>
  </StrictMode>
);