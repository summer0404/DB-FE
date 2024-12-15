import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/createTicket.dto";
import { UpdateTicketDto } from "./dto/updateTicket.dto";
import { TICKET_REPOSITORY } from "src/common/constants";
import { Tickets } from "./tickets.entity";
import { GetTicketByShowtimeDto } from "./dto/getTicketByShowtime.dto";
import { Transaction } from "sequelize";

@Injectable()
export class TicketsService {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: typeof Tickets,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Tickets> {
    return await this.ticketRepository.create(createTicketDto);
  }

  async createAllTransaction(
    createTicketDtos,
    transaction: Transaction,
  ): Promise<Tickets[]> {
    let createdTickets = [];
    for (let i of createTicketDtos) {
      let temp = await this.ticketRepository.create(i, { transaction });
      createdTickets.push(temp);
    }
    return createdTickets;
  }

  async findAll(): Promise<Tickets[]> {
    return this.ticketRepository.findAll();
  }

  async getAllTickets(
    getTicketByShowtime: GetTicketByShowtimeDto,
  ): Promise<Tickets[]> {
    return await this.ticketRepository.findAll({
      where: {
        startTime: getTicketByShowtime.startTime,
        movieId: getTicketByShowtime.movieId,
      },
    });
  }

  async findOne(id: string): Promise<Tickets> {
    return await this.ticketRepository.findByPk(id);
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Tickets> {
    const existingTicket = await this.ticketRepository.findByPk(id);

    if (!existingTicket) throw new BadRequestException("Không tồn tại vé");

    const [numRecordUpdates, [updateRecordData]] =
      await this.ticketRepository.update(updateTicketDto, {
        where: {
          id,
        },
        returning: true,
      });
    return numRecordUpdates > 0 ? updateRecordData : null;
  }

  async remove(id: string) {
    const existingTicket = await this.ticketRepository.findByPk(id);

    if (!existingTicket)
      throw new BadRequestException("Không tồn tại vé tương ứng");

    await this.ticketRepository.destroy({ where: { id } });
  }
}