import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from 'libs/entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    try {
      const newFlight = this.flightRepository.create(createFlightDto);
      return await this.flightRepository.save(newFlight);
    } catch (error) {
      throw new InternalServerErrorException('Error creating the flight');
    }
  }

  // async findAll(): Promise<Flight[]> {
  //   try {
  //     const flights = await this.flightRepository.find();
  //     if (!flights.length) {
  //       throw new NotFoundException('No flights found');
  //     }
  //     return flights;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error retrieving flights');
  //   }
  // }

  // async findOne(id: number): Promise<Flight> {
  //   try {
  //     const flight = await this.flightRepository.findOneBy({ flight_id: id });
  //     if (!flight) {
  //       throw new NotFoundException(`Flight with ID ${id} not found`);
  //     }
  //     return flight;
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error retrieving the flight');
  //   }
  // }

  // async update(id: number, updateFlightDto: Partial<Flight>): Promise<Flight> {
  //   try {
  //     const flight = await this.findOne(id); // Reuse the findOne method to check if flight exists
  //     if (!flight) {
  //       throw new NotFoundException(`Flight with ID ${id} not found`);
  //     }

  //     await this.flightRepository.update(id, updateFlightDto);
  //     return await this.flightRepository.findOneBy({ flight_id: id });
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error updating the flight');
  //   }
  // }

  // async remove(id: number): Promise<void> {
  //   try {
  //     const flight = await this.findOne(id);
  //     if (!flight) {
  //       throw new NotFoundException(`Flight with ID ${id} not found`);
  //     }

  //     await this.flightRepository.delete(id);
  //   } catch (error) {
  //     throw new InternalServerErrorException('Error deleting the flight');
  //   }
  // }
}
