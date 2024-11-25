import { Inject, Injectable } from '@nestjs/common';
import { ACTORS_REPOSITORY } from 'src/common/constants';
import { Actors } from './actors.entity';
import { createActors } from './dtos/create.dto';

@Injectable()
export class ActorsService {
    constructor(
        @Inject(ACTORS_REPOSITORY)
        private readonly actorsRepository: typeof Actors
    ) { }
    async create(createActor:createActors): Promise<createActors>{
        const createdActor = await this.actorsRepository.create(createActor)
        return createdActor
    }
}
