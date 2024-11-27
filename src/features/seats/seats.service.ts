import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SEATS_REPOSITORY } from 'src/common/constants';
import { CreateSeatDto } from './dtos/create.dto';
import { Seats } from './seats.entity';
import { UpdateSeatDto } from './dtos/update.dto';

@Injectable()
export class SeatsService {
    constructor(
        @Inject(SEATS_REPOSITORY)
        private readonly seatsRepository: typeof Seats
    ) { }

    async create(createSeatDto: CreateSeatDto) {
        const createdSeat = await this.seatsRepository.create(createSeatDto);
        return createdSeat;
    }

    async updateSeat(updateSeatDto: UpdateSeatDto) {
        const seat = await this.seatsRepository.findOne({
            where: {
                roomId: updateSeatDto.roomId,
                name: updateSeatDto.name
            }
        });
        if (!seat) {
            throw new NotFoundException("Seat not found");
        }
        const updatedSeat = await seat.update(updateSeatDto);
        return updatedSeat;
    }

    async removeSeat(roomId: string, name: string) {
        const seat = await this.seatsRepository.findOne({
            where: {
                roomId: roomId,
                name: name
            }
        });
        if (!seat) {
            throw new NotFoundException("Seat not found");
        }
        await seat.destroy();
        return { message: "Seat deleted successfully" };
    }

    async getAll() {
        const allSeats = await this.seatsRepository.findAll();
        return allSeats.length > 0 ? allSeats : [];
    }

    async getById(roomId: string, name: string) {
        const seat = await this.seatsRepository.findOne({
            where: {
                roomId: roomId,
                name: name
            }
        });
        if (!seat) {
            throw new NotFoundException("Seat not found");
        }
        return seat;
    }
}
