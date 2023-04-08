import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './modules/user/user.module';
import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    UserModule,
    ContentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}