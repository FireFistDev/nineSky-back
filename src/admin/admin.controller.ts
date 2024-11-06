import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UnauthorizedException, InternalServerErrorException, Query, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateParcelDto } from 'src/parcel/dto/create-parcel.dto';
import { ParcelService } from 'src/parcel/parcel.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateParcelDto } from 'src/parcel/dto/update-parcel.dto';
import { JwtAdminGuard } from 'libs/guards/jwt.Admin.Guard';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

// @UseGuards(JwtAdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
  ) { }
  //  amanatebis sheqmna 

  @Post('/create-parcels')
  createParcels(@Body() createParcelDto: any) {
    return this.adminService.createParcels(createParcelDto)
  }
  // amanatebis modzebna 

  @Get('/get-parcels')
  getParcels(@Query() data : getParcelDto) {
    return this.adminService.getParcels(data)
  }

//  amanatebis washla 
  // localhost:3000/admin/delete-parcel/523312112
  @Delete('/delete-parcel/:id')
  deleteParcel(@Param('id') id: string) {
    return this.adminService.deleteParcel(id);
  }
  //  amanatebis  redaqtireba 
  // localhost:3000/admin/update-parcel/523312112
  @Put('/update-parcel/:id')
  updateParcel(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto) {
    return this.adminService.updateParcel(id, updateParcelDto);
  }
//  useres  modzebna
  @Get('/get-users')
  getUsers(@Query()data : getUserDto  ){
    return this.adminService.getUsers(data)
  }
//  users update

  @Put('/update-user/:id')
  updateUser(@Body() data : UpdateUserDto ,@Param('id') id: string, ){
    return this.adminService.updateUser(id,data)
  }
  
//  users washla 
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string){
    console.log(id)
    return this.adminService.deleteUser(id)
  }
}
