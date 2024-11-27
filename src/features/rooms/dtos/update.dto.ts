import { IsNotEmpty } from "class-validator"

export class UpdateRoomDto {
    @IsNotEmpty()
    id:string
    @IsNotEmpty()
    name:string
}