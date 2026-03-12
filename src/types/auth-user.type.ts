import type { KeycloakRawOutput } from '@omnixys/contracts';

export interface AuthUser {
  id: string;
  username: string;
  email: string;

  roles: string[];

  raw: KeycloakRawOutput;

  sub: string;
  preferred_username: string;
  given_name: string;
  family_name: string;

  realm_access: {
    roles: string[];
  };

  access_token: string;
  refresh_token: string;
}