import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';
import { TICKET_REPOSITORY } from 'src/common/constants';
import { Tickets } from './tickets.entity';

@Injectable()
export class TicketsService {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: typeof Tickets,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Tickets> {
    return await this.ticketRepository.create(createTicketDto);
  }

  async findAll(): Promise<Tickets[]> {
    return this.ticketRepository.findAll();
  }

  async findOne(id: string): Promise<Tickets> {
    return await this.ticketRepository.findByPk(id);
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Tickets> {
    const existingTicket = await this.ticketRepository.findByPk(id);

    if (!existingTicket) throw new BadRequestException('Không tồn tại vé');

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
      throw new BadRequestException('Không tồn tại vé tương ứng');

    await this.ticketRepository.destroy({ where: { id } });
  }
}
