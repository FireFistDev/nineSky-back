import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../libs/entities/user.entity';
import { ParcelModule } from './parcel/parcel.module';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/Declaration.entity';
import { AdminModule } from './admin/admin.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from 'libs/entities/transactions.entity';
import { DeclarationModule } from './declaration/declaration.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    // UserModule,
    // DeclarationModule,
    // ParcelModule,
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
        entities: [User, Parcel,  Declaration, Transaction], 
        synchronize: true, 
        migrationsRun: true,
        logging: true,
      }),
    }),

  ],
})
export class AppModule {}
