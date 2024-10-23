import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.debug('Executing canActivate method');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    this.logger.log('Handle Request:', { user, err, info }); // Added logging
    this.logger.log('user:', { user });
    if (err || !user) {
      this.logger.error(`Authentication failed: ${err || 'User not found'}`);
      throw err || new UnauthorizedException();
    }
    this.logger.debug(`User authenticated: ${user.usuario}`);
    return user;
  }
}
