import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from 'libs/entities/flight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  providers: [FlightService],
})
export class FlightModule {}
