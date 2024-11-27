import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROOMS_REPOSITORY } from 'src/common/constants';
import { Rooms } from './rooms.entity';
import { CreateRoomDto } from './dtos/create.dto';
import { UpdateRoomDto } from './dtos/update.dto';


@Injectable()
export class RoomsService {
    constructor(
        @Inject(ROOMS_REPOSITORY)
        private readonly roomsRepository: typeof Rooms
    ) { }
    async create(createRoom: CreateRoomDto) {
        const createdRoom = await this.roomsRepository.create(createRoom)
        return createdRoom
    }
    async updateRoom(updateRoomDto: UpdateRoomDto) {
        const isRoom = await this.roomsRepository.findByPk(updateRoomDto.id)
        if (!isRoom) {
            throw new NotFoundException("Không tìm thấy phòng chiếu phù hợp")
        }
        const updateData = await isRoom.update(updateRoomDto)
        return updateData
    }
    async removeRoom(id: string) {
        const isRoom = await this.roomsRepository.findByPk(id)
        if (!isRoom) {
            throw new NotFoundException("Không tìm thấy phòng chiếu phù hợp")
        }
        const remove = await isRoom.destroy()
        return remove
    }
    async getAll() {
        const allRooms = await this.roomsRepository.findAll()
        if (allRooms.length == 0) return []
        return allRooms
    }
    async getById(id: string) {
        const isRoom = await this.roomsRepository.findByPk(id)
        if (!isRoom) {
            throw new NotFoundException("Không tìm thấy phòng chiếu phù hợp")
        }
        return isRoom
    }
}