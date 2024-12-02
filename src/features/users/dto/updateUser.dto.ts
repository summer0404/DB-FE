import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './creatUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
