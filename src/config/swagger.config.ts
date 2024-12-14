import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("MovieTheater API")
  .setDescription("API developed by me")
  .setVersion("1.0")
  .setContact(
    "API Support",
    "linh.dohoang@hcmut.edu.vn",
    "trung.phamquang@hcmut.edu.vn",
  )
  .addBearerAuth()
  .build();
