import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configure at app.module instead
  // app.use(cookieSession({
  //   keys: ['asdfasfd']
  // }));

  // app.useGlobalPipes(
    //moved to app.module.ts
    // new ValidationPipe({
    //   //Trip out the unwanted property in request body
    //   whitelist: true
    // })
  // )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
