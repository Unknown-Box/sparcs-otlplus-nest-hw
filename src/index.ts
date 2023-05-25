import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


async function bootstrap() {
  process.env.STAGE = process.argv.includes("--is-dev") ? "DEV" : "PROD";
  const port = process.env.HTTP_PORT ?? 80;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
