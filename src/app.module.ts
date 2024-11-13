import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../libs/entities/user.entity';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/declaration.entity';
import { AdminModule } from './admin/admin.module';
import { Transaction } from 'libs/entities/transactions.entity';
import { UserDetails } from 'libs/entities/userDetails.entity';
import { Flight } from 'libs/entities/flight.entity';
import { Price } from 'libs/entities/prices.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers:[AppController],
  providers:[AppService],
  imports: [
    AuthModule,
    AdminModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('localhost'), 
        port: configService.get<number>('POSTGRES_PORT', 5432), 
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [User, Parcel,  Declaration, Transaction, UserDetails, Flight, Price], 
        synchronize: true, 
        migrationsRun: true,
        logging: false,
      }),
    }),
    TypeOrmModule.forFeature([Price]),

  ],
})
export class AppModule {}
