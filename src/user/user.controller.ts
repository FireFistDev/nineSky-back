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
import { DeclarationService } from 'src/declaration/declaration.service';

// @UseGuards(JwtGuard)
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService, private readonly TransactionService: TransactionService , private readonly declarationService : DeclarationService) { }

//  profili tavis tranzaqciebit da amanatebbit 
  @Get('profile') 
  async getProfile(@GetUser() user : userPaylaod ) {
    const profile = await this.userService.findOne({ id : user.userId }); 
    return profile
  }
//  profilis update
  @Post("update")
  async updateProfile(@GetUser() user : userPaylaod , @Body() body: UpdateUserDto) {
    return await this.userService.update(user.userId, body);
  }
  
  @Post('declarate-parcel')
  @UseInterceptors(FileInterceptor('file'))
  async declarateParcel(@Body() body: CreateDeclarationDto, @UploadedFile() file: Express.Multer.File,) {
    try {
      console.log(file.buffer)
      await this.declarationService.createDeclaration({...body, invoice_Pdf : file.buffer})
    } catch (error) {
      console.log(error)
    }
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
  async payParcels(@GetUser() user: any, @Body() body: any) {

  }
}
