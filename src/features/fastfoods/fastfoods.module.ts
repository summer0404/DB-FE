import { Module } from '@nestjs/common';
import { FastfoodsService } from './fastfoods.service';
import { FastfoodsController } from './fastfoods.controller';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { FASTFOOD_REPOSITORY } from 'src/common/constants';
import { Fastfoods } from './fastfoods.entity';

@Module({
  controllers: [FastfoodsController],
  providers: [
    FastfoodsService,
    {
      provide: FASTFOOD_REPOSITORY,
      useValue: Fastfoods,
    },
  ],
  exports: [FastfoodsService],
  imports: [LoggerModule, ResponseModule],
})
export class FastfoodsModule {}
