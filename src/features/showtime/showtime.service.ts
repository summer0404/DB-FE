import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SHOWTIMES_REPOSITORY } from 'src/common/constants';
import { Showtime } from './showtime.entity';
import { CreateShowtimeDto } from './dtos/create.dto';
import { UpdateShowtimeDto } from './dtos/update.dto';

@Injectable()
export class ShowtimeService {
    constructor(
        @Inject(SHOWTIMES_REPOSITORY)
        private readonly showtimesRepository: typeof Showtime
    ) { }
    async create(createShowtime: CreateShowtimeDto) {
        const createdShowtime = await this.showtimesRepository.create(createShowtime)
        return createdShowtime
    }
    async updateShowtime(updateShowtimeDto: UpdateShowtimeDto) {
        const isShowtime = await this.showtimesRepository.findOne({
            where: {
                roomId: updateShowtimeDto.roomId,
                movieId: updateShowtimeDto.movieId
            }
        })
        if (!isShowtime) {
            throw new NotFoundException("Không tìm thấy suất chiếu phù hợp")
        }
        const updateData = await isShowtime.update(updateShowtimeDto)
        return updateData
    }
    async removeShowtime(roomId: string, movieId: string) {
        const isShowtime = await this.showtimesRepository.findOne({
            where: {
                roomId: roomId,
                movieId: movieId
            }
        })
        if (!isShowtime) {
            throw new NotFoundException("Không tìm thấy suất chiếu phù hợp")
        }
        const remove = await isShowtime.destroy()
        return remove
    }
    async getAll() {
        const allShowtimes = await this.showtimesRepository.findAll()
        if (allShowtimes.length == 0) return []
        return allShowtimes
    }
    async getByIds(roomId: string, movieId: string) {
        const isShowtime = await this.showtimesRepository.findOne({
            where: {
                roomId: roomId,
                movieId: movieId
            }
        })
        if (!isShowtime) {
            throw new NotFoundException("Không tìm thấy suất chiếu phù hợp")
        }
        return isShowtime
    }
}
