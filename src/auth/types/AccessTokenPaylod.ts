import { ConfigService } from '@nestjs/config';

export type AccessTokenPayload = {
  userId: number;
  email: string;
  password: string;
};
