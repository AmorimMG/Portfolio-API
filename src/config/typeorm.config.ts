import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // MSSQL-specific option
    enableArithAbort: true,
    trustServerCertificate: true, // Use only for development purposes
    connectTimeout: 30000, // Increase connection timeout to 30 seconds
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Em produção, é melhor desabilitar isso
};
