import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log(authService)

    super({ usernameField: 'usuario', passwordField: 'senha' });
  }

  async validate(usuario: string, senha: string): Promise<any> {
    const user = await this.authService.validateUser(usuario, senha);
    console.log(user + "user local strategy");
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
