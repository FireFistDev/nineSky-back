import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'libs/guards/local.Guard';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('profile')
  async getProfile(@Query("id")  id:string){
    return await this.userService.findOne({  id});
  }


  @Post("update/:id")
  @Get(':id')
  @UseGuards(JwtGuard)
  async updateProfile(@Param("id") id:string , @Body() body:UpdateUserDto){
        
        return await this.userService.update(id, body)

  }
}
