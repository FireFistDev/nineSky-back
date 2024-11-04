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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly TransactionService: TransactionService) { }

  @Get('profile/:id')
  // @UseGuards(JwtGuard)
  async getProfile(@Param('id') id: string) {
    const profile = await this.userService.findOne({ id });
    return profile;
  }


  @Post("update/:id")
  // @UseGuards(JwtGuard)
  async updateProfile(@Param('id') id: string, @Body() body: any) {
    if (!id) {
      throw new BadRequestException('User ID is required.');
    }
    return await this.userService.update(id, body);
  }
  
  
  @Post('deposite')
  @UseGuards(JwtGuard)
  async updateBalance(@GetUser() user: any, @Body() body: any) {
    const transactionData: CreateTransactionDto = {
      userId: user.sub,
      amount: body.amount,
      transactionType: body.transactionType
    }
    return await this.TransactionService.create(transactionData)
  }

  @Post('declarate-parcel')
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtGuard)
  async declarateParcel(@Body() body: CreateDeclarationDto, @UploadedFile() file: Express.Multer.File,) {
    console.log(file)
    console.log(body)
  }

  @Post('pay-parcels')
  @UseGuards(JwtGuard)
  async payParcels(@GetUser() user: any, @Body() body: any) {

  }
}
