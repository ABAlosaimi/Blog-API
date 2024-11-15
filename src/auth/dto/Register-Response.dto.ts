import { AccessToken } from '../types/AccessToken';

export type RegisterResponseDTO = {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: AccessToken;
};
