import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FlightService } from 'src/flight/flight.service';
import { CreateParcelDto } from 'src/parcel/dto/create-parcel.dto';
import { ParcelService } from 'src/parcel/parcel.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly parcelService: ParcelService
    

  ) {}

  @Post('/create-parcel')
  createParcel(@Body() createParcelDto : CreateParcelDto){
    return this.parcelService.create(createParcelDto)
  }
  

  // @Get('get-users')
  // getUsers(){
  //   return this.adminService.getUsers();
  // }
  // @Get('get-user')
  // getUser(){
  //   return this.adminService.getUsers();
  // }

  // @Post('create-parcel')
  // createParcel(@Body() body ){
  //   return  this.adminService.createParcel(body)
  // }
}
