import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { LoggerModule } from './features/logger/logger.module';
import { ResponseModule } from './features/response/response.module';

@Module({
  imports: [DatabaseModule, LoggerModule, ResponseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
