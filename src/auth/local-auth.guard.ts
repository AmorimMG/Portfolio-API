import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.debug('Executing canActivate method');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('Handle Request:', { user, err, info }); // Add debug statement
    if (err || !user) {
      this.logger.error(`Authentication failed: ${err || 'User not found'}`);
      throw err || new UnauthorizedException();
    }
    this.logger.debug(`User authenticated: ${user.usuario}`);
    return user;
  }
}
