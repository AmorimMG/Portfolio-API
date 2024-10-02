import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger/swagger.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const port = 4000;

	setupSwagger(app);
	app.enableCors({
		origin: ["https://amorim.pro", "http://localhost:5173"],
	});

	await app.listen(port);
}
bootstrap();
