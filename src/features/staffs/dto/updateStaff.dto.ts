import { PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './createStaff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
