import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { COMMENTS_REPOSITORY } from 'src/common/constants';
import { Comments } from './comments.entity';
import { CreateCommentDto } from './dto/create.dto';
import { updateCommentDto } from './dto/update.dto';

@Injectable()
export class CommentsService {
    constructor(
        @Inject(COMMENTS_REPOSITORY)
        private readonly commentsRepository: typeof Comments
    ) { }
    async create(createComment: CreateCommentDto){
        const createdComment = await this.commentsRepository.create(createComment)
        return createdComment
    }
    async updateComment(updateCommentDto: updateCommentDto) {
        const isComment = await this.commentsRepository.findOne({
            where: {
                userId: updateCommentDto.userId,
                movieId: updateCommentDto.movieId
            }
        })
        if (!isComment) {
            throw new NotFoundException("Không tìm thấy bình luận phù hợp")
        }
        const updateData = await isComment.update(updateCommentDto)
        return updateData
    }
    async removeComment(userId: string, movieId: string) {
        const isComment = await this.commentsRepository.findOne({
            where: {
                userId: userId,
                movieId: movieId
            }
        })
        if (!isComment) {
            throw new NotFoundException("Không tìm thấy bình luận phù hợp")
        }
        const remove = await isComment.destroy()
        return remove
    }
    async getAll() {
        const allComments = await this.commentsRepository.findAll()
        if (allComments.length == 0) return []
        return allComments
    }
    async getByIds(userId: string, movieId: string) {
        const isComment = await this.commentsRepository.findOne({
            where: {
                userId: userId,
                movieId: movieId
            }
        })
        if (!isComment) {
            throw new NotFoundException("Không tìm thấy bình luận phù hợp")
        }
        return isComment
    }
}
