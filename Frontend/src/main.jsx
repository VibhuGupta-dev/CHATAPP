import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-mwo411v0umj82ogk.us.auth0.com"
    clientId="3RgxSk4w2ouZwgATTBetHxOZAW5ziRN4"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    
    <App />
  </Auth0Provider>,
);