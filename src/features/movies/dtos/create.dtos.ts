import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsDate } from "class-validator";

export class CreateMovies {
    @ApiProperty({
        description: "Ngày phát hành phim",
        example: "2024-11-29",
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    publishDay: Date;

    @ApiProperty({
        description: "Thời lượng phim (tính bằng phút)",
        example: 120,
    })
    @IsNotEmpty()
    @IsNumber()
    length: number;

    @ApiProperty({
        description: "Giới hạn độ tuổi (số nguyên)",
        example: 13,
    })
    @IsNotEmpty()
    @IsNumber()
    ageLimitation: number;

    @ApiProperty({
        description: "Tên phim",
        example: "Tên phim mẫu",
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "Quốc gia sản xuất phim",
        example: "Việt Nam",
    })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({
        description: "Mô tả chi tiết về phim",
        example: "Mô tả chi tiết nội dung phim.",
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
