import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: "mongodb",
	url: process.env.MONGODB_URI,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	ssl: true,
};
