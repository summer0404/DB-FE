import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ROOMS_REPOSITORY } from "src/common/constants";
import { Rooms } from "./rooms.entity";
import { CreateRoomDto } from "./dtos/create.dto";
import { UpdateRoomDto } from "./dtos/update.dto";
import { Showtime } from "../showtime/showtime.entity";

@Injectable()
export class RoomsService {
  constructor(
    @Inject(ROOMS_REPOSITORY)
    private readonly roomsRepository: typeof Rooms,
  ) {}
  async create(createRoom: CreateRoomDto) {
    const createdRoom = await this.roomsRepository.create(createRoom);
    return createdRoom;
  }
  async updateRoom(updateRoomDto: UpdateRoomDto) {
    const isRoom = await this.roomsRepository.findByPk(updateRoomDto.id);
    if (!isRoom) {
      throw new NotFoundException("Không tìm thấy phòng chiếu phù hợp");
    }
    const name = { name: updateRoomDto.name };
    const updateData = await isRoom.update(name);
    return updateData;
  }
  async removeRoom(id: number) {
    const isRoom = await this.roomsRepository.findByPk(id);
    if (!isRoom) {
      throw new NotFoundException("Không tìm thấy phòng chiếu phù hợp");
    }
    const remove = await isRoom.destroy();
    return remove;
  }
  async getAll() {
    const allRooms = await this.roomsRepository.findAll({
      include: [
        {
          model: Showtime,
        },
      ],
    });
    if (allRooms.length == 0) return [];
    return allRooms;
  }
  async getById(id: string) {
    const isRoom = await this.roomsRepository.findByPk(id);
    if (!isRoom) {
      throw new NotFoundException("Không tìm thấy phòng chiếu phù hợp");
    }
    return isRoom;
  }
}
