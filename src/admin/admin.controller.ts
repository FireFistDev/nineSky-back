import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UnauthorizedException, InternalServerErrorException, Query, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateParcelDto } from 'src/parcel/dto/create-parcel.dto';
import { ParcelService } from 'src/parcel/parcel.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateParcelDto } from 'src/parcel/dto/update-parcel.dto';
import { JwtAdminGuard } from 'libs/guards/jwt.Admin.Guard';


@Controller('admin')
export class AdminController {
  jwtService: any;
  constructor(private readonly adminService: AdminService,
  ) { }
  //  amanatebis sheqmna 

  @Post('/create-parcels')
  createParcels(@Body() createParcelDto: any) {
    return this.adminService.createParcels(createParcelDto)
  }
  // amanatebis modzebna 
  // @UseGuards(JwtAdminGuard)
  @Get('/get-parcels')
  getParcels(@Query() data : getParcelDto,) {
    return this.adminService.getParcels(data)
  }

//  amanatebis washla 
  @Delete('/:id')
  deleteParcel(@Param('id') id: number) {
    return this.adminService.deleteParcel(id);
  }
  //  amanatebis  redaqtireba 
  @Put('/:id')
  updateParcel(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto) {
    return this.adminService.updateParcel(id, updateParcelDto);
  }

  @Get('/get-users')
  getUsers(@Query()data  ){
    return this.adminService.getUsers(data)
  }
}
