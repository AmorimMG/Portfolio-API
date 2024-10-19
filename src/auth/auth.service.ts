import { Injectable, Logger } from '@nestjs/common';
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
    this.logger.debug('Found User:', user);
    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { usuario: user.usuario, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
