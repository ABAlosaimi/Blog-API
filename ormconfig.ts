import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/user/entities/user.entity';
import { Like } from './src/likes/entities/like.entity';
import { Comment } from './src/comment/entities/comment.entity';
import { Artical } from './src/articale/entities/artical.entity';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'dpg-ct4t7lo8fa8c73br5isg-a',
  port: 5432,
  username: 'blog_db_staging_user',
  password: 'Var9ReeMW6MWz7NjgczY4DSqJrFhLOsv',
  database: 'blog_db_staging',
  entities: [User, Like, Comment, Artical],
  synchronize: false, // todo: not safe for production and we should use migrations instead
  subscribers: ['/domain/subscribers/*.subscriber{.ts,.js}'],
  migrations: ['/migration/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
 dataSource.initialize();

export default dataSource;
