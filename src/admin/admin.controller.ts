import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UnauthorizedException, InternalServerErrorException, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateParcelDto } from 'src/parcel/dto/create-parcel.dto';
import { ParcelService } from 'src/parcel/parcel.service';
import { JwtService } from '@nestjs/jwt';

@Controller('admin')
export class AdminController {
 
  constructor(private readonly adminService: AdminService,
    private readonly parcelService: ParcelService,
    private readonly jwtService: JwtService,



  ) { }

  @Post('/create-parcel')
  createParcel(@Body() createParcelDto: CreateParcelDto) {
    return this.parcelService.create(createParcelDto)
  }


  @Post("/login-as-admin")
  loginAsAdmin(@Body() body: any) {
    try {


      const admin = {
        email: "admin@info.com",
        password: "12345"
      }
      const { email, password } = body
      if (password !== admin.password) {
        throw new UnauthorizedException('password not correct ');

      }
      if (email !== admin.email) {
        throw new UnauthorizedException("email not correct ")
      }

      const payload = { email: admin.email, role: "admin", id: 1 }

      return {
        access_token: this.jwtService.sign(payload, {

          expiresIn: '30d',
        }),
      };
    } catch (error) {
      console.log(error)
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new InternalServerErrorException('Login failed.');
    }
  }
  @Get('get-users')
  getUsers(
    @Query('searchTerm') searchTerm: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    // Parse page and limit as numbers, with default values
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return this.adminService.getUsers(searchTerm, pageNumber, limitNumber);
  }
  // @Get('get-user')
  // getUser(){
  //   return this.adminService.getUsers();
  // }

  // @Post('create-parcel')
  // createParcel(@Body() body ){
  //   return  this.adminService.createParcel(body)
  // }
}
