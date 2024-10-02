import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import * as dotenv from "dotenv";
import { UsuarioModule } from "../usuarios/usuario.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

dotenv.config();

@Module({
	imports: [
		UsuarioModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "60m" },
		}),
	],
	providers: [
		AuthService,
		JwtStrategy,
		{
			provide: "APP_GUARD",
			useClass: LocalStrategy,
		},
	],
	controllers: [AuthController],
})
export class AuthModule {}
