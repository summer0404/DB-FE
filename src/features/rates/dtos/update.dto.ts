import { PartialType } from "@nestjs/swagger";
import { CreateRateDto } from "./create.dto";

export class UpdateRateDto extends PartialType(CreateRateDto) {}
