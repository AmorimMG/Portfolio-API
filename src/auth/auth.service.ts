import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, senha: string): Promise<any> {
    const user = await this.usuarioService.findByUser(usuario);
    this.logger.log('Found User:', user);
    if (user) {
      const passwordMatch = await bcrypt.compare(senha, user.senha);
      this.logger.log('Password Match:', passwordMatch);
      if (passwordMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect password');
      }
    }
    throw new UnauthorizedException('User not found');
  }

  async login(user: any) {
    const payload = { usuario: user.usuario, id: user._id.toString() }; // Changed to use user._id.toString()
    this.logger.log('Payload before token generation:', payload);
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
