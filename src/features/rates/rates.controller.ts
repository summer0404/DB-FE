import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from '../response/response.entity';
import { LoggerService } from '../logger/logger.service';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dtos/create.dto';
import { UpdateRateDto } from './dtos/update.dto';

@Controller('rates')
export class RatesController {
    constructor(
        private readonly rateService: RatesService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }

    @Post("/create")
    async createRate(@Res() res, @Body() createRateDto: CreateRateDto) {
        try {
            const rate = await this.rateService.create(createRateDto);
            this.logger.debug('Rate created successfully');
            this.response.initResponse(true, 'Rate created successfully', rate);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error during rate creation', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Put("/update")
    async updateRate(@Res() res, @Body() updateRateDto: UpdateRateDto) {
        try {
            const rate = await this.rateService.updateRate(updateRateDto);
            this.logger.debug('Rate information updated successfully');
            this.response.initResponse(true, 'Rate information updated successfully', rate);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error during rate update', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Delete("/:userId/:movieId")
    async deleteRate(@Res() res, @Param("userId") userId: string, @Param("movieId") movieId: string) {
        try {
            const result = await this.rateService.removeRate(userId, movieId);
            this.logger.debug('Rate deleted successfully');
            this.response.initResponse(true, 'Rate deleted successfully', result);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error during rate deletion', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Get("/all")
    async getAllRates(@Res() res) {
        try {
            const rates = await this.rateService.getAllRates();
            this.logger.debug('All rates retrieved successfully');
            this.response.initResponse(true, 'All rates retrieved successfully', rates);
            return res.status(rates.length > 0 ? HttpStatus.OK : HttpStatus.NO_CONTENT).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error retrieving rates', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }

    @Get("/:userId/:movieId")
    async getRateByIds(@Res() res, @Param("userId") userId: string, @Param("movieId") movieId: string) {
        try {
            const rate = await this.rateService.getRateByIds(userId, movieId);
            this.logger.debug('Rate details retrieved successfully');
            this.response.initResponse(true, 'Rate details retrieved successfully', rate);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof HttpException) {
                this.response.initResponse(false, error.message, null);
                return res.status(error.getStatus()).json(this.response);
            } else {
                this.response.initResponse(false, 'Error retrieving rate details', null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
        }
    }
}
