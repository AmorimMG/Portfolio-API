import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
