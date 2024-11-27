import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RATES_REPOSITORY } from 'src/common/constants';
import { Rates } from './rates.entity';
import { CreateRateDto } from './dtos/create.dto';
import { UpdateRateDto } from './dtos/update.dto';

@Injectable()
export class RatesService {
    constructor(
        @Inject(RATES_REPOSITORY)
        private readonly ratesRepository: typeof Rates
    ) { }

    async create(createRateDto: CreateRateDto) {
        const createdRate = await this.ratesRepository.create(createRateDto);
        return createdRate;
    }

    async updateRate(updateRateDto: UpdateRateDto) {
        const rate = await this.ratesRepository.findOne({
            where: {
                userId: updateRateDto.userId,
                movieId: updateRateDto.movieId
            }
        });

        if (!rate) {
            throw new NotFoundException("Rate not found");
        }

        const updatedRate = await rate.update(updateRateDto);
        return updatedRate;
    }

    async removeRate(userId: string, movieId: string) {
        const rate = await this.ratesRepository.findOne({
            where: {
                userId: userId,
                movieId: movieId
            }
        });

        if (!rate) {
            throw new NotFoundException("Rate not found");
        }

        await rate.destroy();
        return { message: "Rate deleted successfully" };
    }

    async getAllRates() {
        const allRates = await this.ratesRepository.findAll();
        return allRates.length > 0 ? allRates : [];
    }

    async getRateByIds(userId: string, movieId: string) {
        const rate = await this.ratesRepository.findOne({
            where: {
                userId: userId,
                movieId: movieId
            }
        });

        if (!rate) {
            throw new NotFoundException("Rate not found");
        }

        return rate;
    }
}
