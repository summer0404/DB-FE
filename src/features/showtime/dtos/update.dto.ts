import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { CreateShowtimeDto } from "./create.dto";

export class UpdateShowtimeDto extends PartialType(CreateShowtimeDto) {}
