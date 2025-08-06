import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgresql://blog_db_staging_user:Var9ReeMW6MWz7NjgczY4DSqJrFhLOsv@dpg-ct4t7lo8fa8c73br5isg-a.singapore-postgres.render.com/blog_db_staging',
  port: 5432,
  username: 'blog_db_staging_user',
  password: 'Var9ReeMW6MWz7NjgczY4DSqJrFhLOsv',
  database: 'blog_db_staging',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // todo: not safe for production and we should use migrations instead
  subscribers: [__dirname + '/domain/subscribers/*.subscriber{.ts,.js}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;
