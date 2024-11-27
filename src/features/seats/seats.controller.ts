import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { Response } from '../response/response.entity';
import { LoggerService } from '../logger/logger.service';
import { CreateSeatDto } from './dtos/create.dto';
import { UpdateSeatDto } from './dtos/update.dto';

@Controller('seats')
export class SeatsController {
    constructor(
        private readonly seatsService: SeatsService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }

    @Post("/create")
    async createSeat(@Res() res, @Body() createSeatDto: CreateSeatDto) {
        try {
            const seat = await this.seatsService.create(createSeatDto);
            this.logger.debug('Seat created successfully');
            this.response.initResponse(true, 'Seat created successfully', seat);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error during seat creation', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Put("/update")
    async updateSeat(@Res() res, @Body() updateSeatDto: UpdateSeatDto) {
        try {
            const seat = await this.seatsService.updateSeat(updateSeatDto);
            this.logger.debug('Seat updated successfully');
            this.response.initResponse(true, 'Seat updated successfully', seat);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error during seat update', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Delete("/:roomId/:name")
    async deleteSeat(@Res() res, @Param("roomId") roomId: string, @Param("name") name: string) {
        try {
            const result = await this.seatsService.removeSeat(roomId, name);
            this.logger.debug('Seat deleted successfully');
            this.response.initResponse(true, 'Seat deleted successfully', result);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error during seat deletion', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Get("/all")
    async getAllSeats(@Res() res) {
        try {
            const seats = await this.seatsService.getAll();
            this.logger.debug('All seats retrieved successfully');
            this.response.initResponse(true, 'All seats retrieved successfully', seats);
            return res.status(seats.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error retrieving all seats', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Get("/:roomId/:name")
    async getSeatById(@Res() res, @Param("roomId") roomId: string, @Param("name") name: string) {
        try {
            const seat = await this.seatsService.getById(roomId, name);
            this.logger.debug('Seat details retrieved successfully');
            this.response.initResponse(true, 'Seat details retrieved successfully', seat);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error retrieving seat details', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }
}
