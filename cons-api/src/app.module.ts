import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE.TYPE'),
        host: configService.get<string>('DATABASE.HOST'),
        port: configService.get<number>('DATABASE.PORT'),
        username: configService.get<string>('DATABASE.USERNAME'),
        password: configService.get<string>('DATABASE.PASSWORD'),
        database: configService.get<string>('DATABASE.NAME'),
        entities: [configService.get<string>('DATABASE.ENTITIES')],
        synchronize: configService.get<boolean>('DATABASE.SYNCHRONIZE'),
      } as TypeOrmModuleOptions),
      inject: [ConfigService]
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
