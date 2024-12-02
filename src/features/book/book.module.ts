import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';
import { BOOK_REPOSITORY } from 'src/common/constants';
import { Book } from './book.entity';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BOOK_REPOSITORY,
      useValue: Book,
    },
  ],
  imports: [LoggerModule, ResponseModule],
  exports: [BookService],
})
export class BookModule {}
