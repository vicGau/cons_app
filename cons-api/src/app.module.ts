import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BookingModule } from './booking/booking.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get<string>('DATABASE.TYPE'),
          host: configService.get<string>('DATABASE.HOST'),
          port: configService.get<number>('DATABASE.PORT'),
          username: configService.get<string>('DATABASE.USERNAME'),
          password: configService.get<string>('DATABASE.PASSWORD'),
          database: configService.get<string>('DATABASE.NAME'),
          entities: [configService.get<string>('DATABASE.ENTITIES')],
          synchronize: configService.get<boolean>('DATABASE.SYNCHRONIZE'),
          autoLoadEntities: configService.get<boolean>('DATABASE.AUTOLOAD'),
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    BookingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
