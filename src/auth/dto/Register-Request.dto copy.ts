import { Artical } from 'src/articale/entities/artical.entity';

export type RegisterRequestDto = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: number;
  articals: Artical[];
};
