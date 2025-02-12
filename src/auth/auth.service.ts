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
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }

  async login(user: any) {
    if (!user || !user._id) {
      throw new UnauthorizedException('Invalid user data');
    }

    const payload = { usuario: user.usuario, id: user._id.toString() };
    this.logger.log('Payload before token generation:', payload);

    return {
      usuario: user.usuario,
      id: user._id.toString(),
      access_token: this.jwtService.sign(payload),
    };
  }
}
