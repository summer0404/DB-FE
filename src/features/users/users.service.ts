import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/creatUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { USER_REPOSITORY, UserType } from "src/common/constants";
import { Users } from "./users.entity";
import { Transaction } from "sequelize";
import { Customers } from "../customers/customers.entity";
import { Staffs } from "../staffs/staffs.entity";
import { UUID } from "crypto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof Users,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    transaction: Transaction,
  ): Promise<Users> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
      transaction,
    });

    if (existingUser)
      throw new BadRequestException("Email người dùng đã tồn tại");

    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.findAll({
      include: [
        {
          model: Customers,
          as: "customer",
        },
        {
          model: Staffs,
          as: "staff",
        },
      ],
    });
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.userRepository.findByPk(id, {
      include: [
        {
          model: Customers,
          as: "customer",
        },
        {
          model: Staffs,
          as: "staff",
        },
      ],
    });
    if (!user) throw new BadRequestException("Không tồn tại người dùng");
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    transaction: Transaction,
  ): Promise<Users> {
    const existingUser = await this.userRepository.findByPk(id);

    if (!existingUser)
      throw new BadRequestException("Không tồn tại người dùng");

    const [affectedRow, [updatedUser]] = await this.userRepository.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
        transaction,
      },
    );
    return affectedRow > 0 ? updatedUser : null;
  }

  async remove(id: string) {
    const existingUser = await this.userRepository.findByPk(id);

    if (!existingUser)
      throw new BadRequestException("Không tồn tại người dùng");

    await this.userRepository.destroy({
      where: { id },
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(
      { refreshToken: currentRefreshToken },
      { where: { id: userId } },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: UUID) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(
      { refreshToken: null },
      { where: { id: userId } },
    );
  }
}
