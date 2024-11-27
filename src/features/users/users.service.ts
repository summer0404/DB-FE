import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/creatUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'src/common/constants';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof Users,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser)
      throw new BadRequestException('Email người dùng đã tồn tại');

    const user = await this.userRepository.create(createUserDto);

    return user;
  }

  async findAll(): Promise<Users[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
