import type { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: "mongodb",
	url: process.env.DATABASE_PATH,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: [__dirname + "/../**/*.entity{.ts,.js}"],
	ssl: true, // SSL is already implicitly enabled with MongoDB Atlas
	logging: true, 
	synchronize: true, // Em produção, é melhor desabilitar isso
	connectTimeoutMS: 200000,  // Increase timeout to 10 seconds
	socketTimeoutMS: 450000,  // Increase socket timeout to 45 seconds
};
