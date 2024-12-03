import { PartialType } from "@nestjs/swagger";
import { CreateFastfoodDto } from "./createFastfood.dto";

export class UpdateFastfoodDto extends PartialType(CreateFastfoodDto) {}
