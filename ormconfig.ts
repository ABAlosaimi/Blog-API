import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'Blog-db',
  entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
  synchronize: false, // todo: not safe for production and we should use migrations instead
  subscribers: [__dirname + '/domain/subscribers/*.subscriber{.ts,.js}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;
