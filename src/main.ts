import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swagger.config";
import { ValidationInputPipe } from "./common/pipes/validationInput.pipe";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("database/api/v1");
  app.useGlobalPipes(new ValidationInputPipe());
  app.enableCors({
    origin: "http://localhost:5173",
  });
  app.use(cookieParser());
  const ApiDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, ApiDocument);

  await app.listen(3010);
}
bootstrap();
