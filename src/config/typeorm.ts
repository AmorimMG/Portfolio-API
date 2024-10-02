import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGODB_URI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],  
  //synchronize: true, // Em produção, é melhor desabilitar isso
  synchronize: true, // Em produção, é melhor desabilitar isso
};
