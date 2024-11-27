import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { LoggerModule } from './features/logger/logger.module';
import { ResponseModule } from './features/response/response.module';
import { UsersModule } from './features/users/users.module';
import { StaffsModule } from './features/staffs/staffs.module';
import { CustomersModule } from './features/customers/customers.module';

@Module({
  imports: [DatabaseModule, LoggerModule, ResponseModule, UsersModule, StaffsModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
