import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as dotenv from 'dotenv';
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger/swagger.config";
dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const port = 4000;

	setupSwagger(app);
	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Accept, Authorization',
	});

	await app.listen(port);
}
bootstrap();
