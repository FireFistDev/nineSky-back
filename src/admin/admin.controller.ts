import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from 'libs/dtos/UserDto.ts/update-user.dto';
import { UploadParcelsDto } from 'libs/dtos/parcelDtos.ts/UploadParcelsDto';
import { UpdateParcelDto } from 'libs/dtos/parcelDtos.ts/update-parcel.dto';
import { JwtAdminGuard } from 'libs/guards/jwt.Admin.Guard';


// @UseGuards(JwtAdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
  ) { }


  @Post('/create-parcels')
  uploadParcels(@Body() body: UploadParcelsDto) {
    return this.adminService.uploadParcels(body)
  }

  @Get('/get-parcels')
  getParcels(@Query() data: getParcelDto) {
    return this.adminService.getAllParcel(data)
  }

  //  amanatebis  redaqtireba +
  @Put('/update-parcel/:id')
  updateParcel(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto) {
    return this.adminService.updateParcel(id, updateParcelDto);
  }

  //  amanatebis washla 

  @Delete('/delete-parcel/:id')
  deleteParcel(@Param('id') id: string) {
    return this.adminService.deleteParcel(id);
  }

  //  useres  modzebna
  @Get('/get-users')
  getUsers(@Query() data: getUserDto) {
    return this.adminService.getUsers(data)
  }
  //  users update

  @Put('/update-user/:id')
  updateUser(@Body() data: UpdateUserDto, @Param('id') id: string,) {
    return this.adminService.updateUser(id, data)
  }

  //  users washla 
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id)
  }

  @Put('update-price')
  updatePrice(@Query() data : {china : number, turkey : number}){
    return this.adminService.updatePrice(data)
  }
}
