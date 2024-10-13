import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: "mongodb",
	url: process.env.DATABASE_PATH,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	ssl: true, // SSL is already implicitly enabled with MongoDB Atlas
	logging: true, 
	synchronize: true, // Em produção, é melhor desabilitar isso
	connectTimeoutMS: 10000,  // Increase timeout to 10 seconds
	socketTimeoutMS: 45000,  // Increase socket timeout to 45 seconds
};
