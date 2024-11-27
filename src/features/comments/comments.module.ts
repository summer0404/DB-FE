import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { COMMENTS_REPOSITORY } from 'src/common/constants';
import { Comments } from './comments.entity';
import { LoggerModule } from '../logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports: [LoggerModule, ResponseModule],
    providers: [CommentsService, {
        provide: COMMENTS_REPOSITORY,
        useValue: Comments
    }],
    controllers: [CommentsController]
})
export class CommentsModule { }
