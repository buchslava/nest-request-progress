import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ProgressManager } from './progress-manager';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, ProgressManager],
})
export class AppModule {}
