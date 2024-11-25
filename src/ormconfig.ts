import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Artical } from './articale/entities/artical.entity';
import { Comment } from './comment/entities/comment.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'abdo',
  password: 'abdo123',
  database: 'test_db',
  entities: [User, Artical, Comment],
  migrations: ['./migration/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
