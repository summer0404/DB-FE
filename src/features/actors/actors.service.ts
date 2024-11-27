import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTORS_REPOSITORY } from 'src/common/constants';
import { Actors } from './actors.entity';
import { createActors } from './dtos/create.dto';
import { updateActors } from './dtos/update.dto';

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
    async updateActor(updateActorDto: updateActors) {
        const isActor = await this.actorsRepository.findOne({
            where:{
                movieId: updateActorDto.movieId,
                id:updateActorDto.id
            }
        })
        if (!isActor) {
            throw new NotFoundException("Không tìm thấy diễn viên phù hợp")
        }
        const updateData = await isActor.update(updateActorDto)
        return updateData
    }
    async removeActor(movieId: string, id:string) {
        const isActor = await this.actorsRepository.findOne({
            where: {
                movieId: movieId,
                id: id
            }
        })
        if (!isActor) {
            throw new NotFoundException("Không tìm thấy diễn viên phù hợp")
        }
        const remove = await isActor.destroy()
        return remove
    }
    async getAll() {
        const allActors = await this.actorsRepository.findAll()
        if (allActors.length == 0) return []
        return allActors
    }
    async getById(movieId:string, id: string) {
        const isActor = await this.actorsRepository.findOne({
            where: {
                movieId: movieId,
                id: id
            }
        })
        if (!isActor) {
            throw new NotFoundException("Không tìm thấy diễn viên phù hợp")
        }
        return isActor
    }
}
