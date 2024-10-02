import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: "mongodb",
	url: process.env.MONGODB_URI,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	ssl: false,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	//synchronize: true, // Em produção, é melhor desabilitar isso
	synchronize: true, // Em produção, é melhor desabilitar isso
};
