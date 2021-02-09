import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { UsersModule } from './users/users.module';

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
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
