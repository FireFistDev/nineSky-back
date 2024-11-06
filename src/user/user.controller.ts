import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UseInterceptors, UploadedFiles, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';
import { TransactionService } from 'src/transaction/transaction.service';
import { GetUser } from 'libs/decorators/getUser';
import { User } from 'libs/entities/user.entity';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateDeclarationDto } from 'src/declaration/dto/create-declaration.dto';

@UseGuards(JwtGuard)
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService, private readonly TransactionService: TransactionService) { }

//  profili tavis tranzaqciebit da amanatebbit 
  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@GetUser() user : userPaylaod ) {
    const profile = await this.userService.findOne({ id : user.userId }); 
    return profile
  }
//  profilis update
  @Post("update")
  async updateProfile(@GetUser() user : userPaylaod , @Body() body: any) {
    return await this.userService.update(user.userId, body);
  }
  
  @Post('declarate-parcel')
  @UseInterceptors(FileInterceptor('file'))
  async declarateParcel(@Body() body: CreateDeclarationDto, @UploadedFile() file: Express.Multer.File,) {
    console.log(file)
    console.log(body)
  }
  
  
  // @Post('deposite')
  // async updateBalance(@GetUser() user: any, @Body() body: any) {
  //   const transactionData: CreateTransactionDto = {
  //     userId: user.sub,
  //     amount: body.amount,
  //     transactionType: body.transactionType
  //   }
  //   return await this.TransactionService.create(transactionData)
  // }



  @Post('pay-parcels')
  @UseGuards(JwtGuard)
  async payParcels(@GetUser() user: any, @Body() body: any) {

  }
}
