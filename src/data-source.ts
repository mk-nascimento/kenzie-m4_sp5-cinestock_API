import 'dotenv/config';
import path from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{js,ts}');
  const migrationsPath: string = path.join(__dirname, './migrations/**.{js,ts}');

  const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
  const NODE_ENV: string | undefined = process.env.NODE_ENV;
  const ENV_TEST: boolean = NODE_ENV === 'test';

  if (ENV_TEST)
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [entitiesPath],
    };

  if (!DATABASE_URL) throw new Error(`Missing env var: 'DATABASE_URL'`);

  return {
    type: 'postgres',
    url: DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
