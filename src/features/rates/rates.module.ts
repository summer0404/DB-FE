import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { RATES_REPOSITORY } from 'src/common/constants';
import { Rates } from './rates.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports:[LoggerModule, ResponseModule],
  providers: [RatesService, {
    provide: RATES_REPOSITORY,
    useValue: Rates
  }],
  controllers: [RatesController]
})
export class RatesModule {}
