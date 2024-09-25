import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'libs/guards/local.Guard';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';
import { TransactionService } from 'src/transaction/transaction.service';
import { GetUser } from 'libs/decorators/getUser';
import { User } from 'libs/entities/user.entity';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly TransactionService : TransactionService) {}
  
  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@GetUser() user ){
    const profile = await this.userService.findOne({email : user.email});
    return profile
  }


  @Post("update/:id")
  @UseGuards(JwtGuard)
  async updateProfile(   @GetUser() user: any ,@Body() body:UpdateUserDto){
        
        return await this.userService.update(user.sub, body)

  }

  @Post('deposite')
  @UseGuards(JwtGuard)
  async updateBalance(  @GetUser() user: any ,@Body() body:any){
    const transactionData : CreateTransactionDto= {
      userId: user.sub,
      amount : body.amount,
      transactionType : body.transactionType
    }
    return await  this.TransactionService.create(transactionData)
  }
}
