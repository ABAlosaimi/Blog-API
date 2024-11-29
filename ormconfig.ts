import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/user/entities/user.entity';
import { Like } from './src/likes/entities/like.entity';
import { Comment } from './src/comment/entities/comment.entity';
import { Artical } from './src/articale/entities/artical.entity';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'Blog-db',
  entities: [User, Like, Comment, Artical],
  synchronize: false, // todo: not safe for production and we should use migrations instead
  subscribers: ['/domain/subscribers/*.subscriber{.ts,.js}'],
  migrations: ['/migration/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
// dataSource.initialize();

export default dataSource;
