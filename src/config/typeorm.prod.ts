import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_SERVER_PROD,
  port: parseInt(process.env.DB_PORT_PROD, 10),
  username: process.env.DB_USERNAME_PROD,
  password: process.env.DB_PASSWORD_PROD,
  database: process.env.DB_DATABASE_PROD,
  options: {
    encrypt: false,
    enableArithAbort: true,
    connectTimeout: 30000,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // disable synchronize in production
};
