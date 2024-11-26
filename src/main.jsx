import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App2.jsx';
import './index.css';
import Keycloak from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';

// Настройка Keycloak
const keycloak = new Keycloak({
  url: `http://${import.meta.env.VITE_KEYCLOACK_ADDRESS}`, 
  realm: import.meta.env.VITE_KEYCLOACK_REALM,
  clientId: import.meta.env.VITE_KEYCLOACK_CLIENT_ID
});
console.log(keycloak)
const onKeycloakEvent = (event, error) => {
  console.log('onKeycloakEvent', event, error);
};

const onKeycloakTokens = (tokens) => {
  console.log('onKeycloakTokens', tokens);
};

createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider
  authClient={keycloak}
  // onEvent={onKeycloakEvent}
  // onTokens={onKeycloakTokens}
  > 
    <StrictMode>
      <App />
    </StrictMode>
  </ReactKeycloakProvider>
);