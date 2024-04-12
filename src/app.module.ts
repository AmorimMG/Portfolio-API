import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { SpotifyController } from './spotify/spotify.controller';
import { SpotifyService } from './spotify/spotify.service';
import { DiscordController } from './discord/discord.controller';
import { DiscordService } from './discord/discord.service';
import { LastFMController } from './lastFM/lastfm.controller';
import { LastFMService } from './lastFM/lastfm.service';
import { SteamController } from './steam/steam.controller';
import { SteamService } from './steam/steam.service';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    MailController,
    SpotifyController,
    DiscordController,
    LastFMController,
    SteamController,
  ],
  providers: [
    AppService,
    MailService,
    SpotifyService,
    DiscordService,
    LastFMService,
    SteamService,
  ],
})
export class AppModule {}
