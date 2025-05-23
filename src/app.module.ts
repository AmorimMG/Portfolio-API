import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { CloudinaryConfig } from './cloudinary/cloudinary.config';
import { LinguagemModule } from './linguagens/linguagens.module';
import { ProjetoModule } from './projetos/projetos.module';
import { ShutdownModule } from './shutdown/shutdown.module';
import { SystemInfoModule } from './system-info/system-info.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { VncModule } from './vnc/vnc.module';
import { WakeOnLanModule } from './wol/wake-on-lan.module';

import { AnilistController } from './anilist/anilist.controller';
import { AnilistService } from './anilist/anilist.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordController } from './discord/discord.controller';
import { DiscordService } from './discord/discord.service';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';
import { IgdbController } from './igdb/igdb.controller';
import { IgdbService } from './igdb/igdb.service';
import { LastFMController } from './lastFM/lastfm.controller';
import { LastFMService } from './lastFM/lastfm.service';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { SpotifyController } from './spotify/spotify.controller';
import { SpotifyService } from './spotify/spotify.service';
import { SteamController } from './steam/steam.controller';
import { SteamService } from './steam/steam.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsuarioModule,
    ProjetoModule,
    WakeOnLanModule,
    ShutdownModule,
    SystemInfoModule,
    VncModule,
    ChatModule,
    LinguagemModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [
    AppController,
    MailController,
    SpotifyController,
    IgdbController,
    DiscordController,
    LastFMController,
    SteamController,
    AnilistController,
    GithubController,
  ],
  providers: [
    AppService,
    MailService,
    SpotifyService,
    IgdbService,
    DiscordService,
    LastFMService,
    SteamService,
    AnilistService,
    GithubService,
    {
      provide: 'Cloudinary',
      inject: [ConfigService],
      useFactory: CloudinaryConfig,
    },
  ],
  exports: ['Cloudinary'],
})
export class AppModule {}
