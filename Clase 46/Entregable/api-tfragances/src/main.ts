import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import {resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views/pages'));
  // app.useStaticAssets(resolve('./public'));
  // app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('ejs');

  await app.listen(8080);
}
bootstrap();
