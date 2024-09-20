import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'libs/guards/local.Guard';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  getProfile(){
    return this.userService.getProfile();
  }
}
