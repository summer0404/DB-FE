import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { COUPON_REPOSITORY } from 'src/common/constants';
import { Coupons } from './coupons.entity';

@Module({
  controllers: [CouponsController],
  providers: [
    CouponsService,
    {
      provide: COUPON_REPOSITORY,
      useValue: Coupons,
    },
  ],
  exports: [CouponsService],
  imports: [LoggerModule, ResponseModule],
})
export class CouponsModule {}
