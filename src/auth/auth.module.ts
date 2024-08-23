import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuarios/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy, 
    {
    provide: 'APP_GUARD',
    useClass: LocalStrategy,
  }],
  controllers: [AuthController],
})
export class AuthModule {}
