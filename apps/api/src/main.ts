import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const  cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.use(
    cookieSession({
      keys: ['knight']
    })
  );

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
