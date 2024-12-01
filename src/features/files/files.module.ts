import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsersModule } from '../users/users.module';
import { StorageModule } from '../storage/storage.module';
import { FILE_REPOSITORY } from 'src/common/constants';
import { Files } from './files.entity';

@Module({
  imports: [UsersModule, StorageModule],
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: FILE_REPOSITORY,
      useValue: Files,
    },
  ],
  exports: [FilesService],
})
export class FilesModule {}
