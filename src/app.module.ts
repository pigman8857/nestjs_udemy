import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    //We gonna use dependency injection with ConfigService instead
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
            type: 'sqlite',
            database: config.get<string>('DB_NAME'),
            entities: [User, Report],
            synchronize: true
          }
      }
    }),
    UsersModule, 
    ReportsModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        //Trip out the unwanted property in request body
        whitelist: true
      })
    }
  ],
})
export class AppModule {
  configure(consumer : MiddlewareConsumer){
    console.log('AppModule.configure()');
    consumer.apply(
      cookieSession({
        keys: ['asdfasfd']
      })
    ).forRoutes('*');

  }
}
