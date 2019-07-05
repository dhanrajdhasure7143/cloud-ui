interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'w2BmTjLNeoMwIJOBX0M5W8XYcGrNuKTw',
  domain: 'dev-133jqszi.auth0.com',
  callbackURL: 'http://localhost:4200/pages/dashboard'
};
