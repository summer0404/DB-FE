import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SHOWTIMES_REPOSITORY } from "src/common/constants";
import { Showtime } from "./showtime.entity";
import { CreateShowtimeDto } from "./dtos/create.dto";
import { UpdateShowtimeDto } from "./dtos/update.dto";
import { GetTicketByShowtimeDto } from "../tickets/dto/getTicketByShowtime.dto";
import { Tickets } from "../tickets/tickets.entity";
import { Transaction } from "sequelize";

@Injectable()
export class ShowtimeService {
  constructor(
    @Inject(SHOWTIMES_REPOSITORY)
    private readonly showtimesRepository: typeof Showtime,
  ) {}

  async create(createShowtime: CreateShowtimeDto) {
    const createdShowtime =
      await this.showtimesRepository.create(createShowtime);
    return createdShowtime;
  }

  async createTransaction(
    createShowtime: CreateShowtimeDto,
    transaction: Transaction,
  ) {
    const createdShowtime = await this.showtimesRepository.create(
      createShowtime,
      { transaction },
    );
    return createdShowtime;
  }

  async updateShowtime(updateShowtimeDto: UpdateShowtimeDto) {
    const isShowtime = await this.showtimesRepository.findOne({
      where: {
        roomId: updateShowtimeDto.roomId,
        movieId: updateShowtimeDto.movieId,
      },
    });
    if (!isShowtime) {
      throw new NotFoundException("Không tìm thấy suất chiếu phù hợp");
    }
    const updateData = await isShowtime.update(updateShowtimeDto);
    return updateData;
  }

  async removeShowtime(roomId: string, movieId: string) {
    const isShowtime = await this.showtimesRepository.findOne({
      where: {
        roomId: roomId,
        movieId: movieId,
      },
    });
    if (!isShowtime) {
      throw new NotFoundException("Không tìm thấy suất chiếu phù hợp");
    }
    const remove = await isShowtime.destroy();
    return remove;
  }

  async getAll() {
    const allShowtimes = await this.showtimesRepository.findAll();
    if (allShowtimes.length == 0) return [];
    return allShowtimes;
  }

  async getByIds(roomId: string, movieId: string) {
    const isShowtime = await this.showtimesRepository.findOne({
      where: {
        roomId: roomId,
        movieId: movieId,
      },
    });
    if (!isShowtime) {
      throw new NotFoundException("Không tìm thấy suất chiếu phù hợp");
    }
    return isShowtime;
  }

  async getAllTickets(
    getTicketByShowtime: GetTicketByShowtimeDto,
  ): Promise<Showtime[]> {
    const tickets = await this.showtimesRepository.findAll({
      where: {
        movieId: getTicketByShowtime.movieId,
        startTime: getTicketByShowtime.startTime,
      },
      include: [
        {
          model: Tickets,
          as: "tickets",
        },
      ],
    });
    return tickets;
  }

  async getByMovie(movieId: string): Promise<Showtime[]> {
    return await this.showtimesRepository.findAll({
      where: {
        movieId,
      },
    });
  }
}
