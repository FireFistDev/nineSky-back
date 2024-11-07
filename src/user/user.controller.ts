import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';
import { GetUser } from 'libs/decorators/getUser';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateDeclarationDto } from 'libs/dtos/declarationDtos.ts/createDeclarationDto';


// @UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

//  profili tavis tranzaqciebit da amanatebbit 
  @Get('profile') 
  async getProfile(@GetUser() user : userPaylaod ) {
    console.log(user.sub)
    return  await this.userService.getProfile(user.sub); 
  }
//  profilis update
  @Post("update")
  async updateProfile(@GetUser() user : userPaylaod , @Body() body: UpdateUserDto) {
    return await this.userService.updateProfile(user.sub, body);
  }

  // //  deklaracia  form Data 
  @Post('declarate-parcel')
  @UseInterceptors(FileInterceptor('file'))
  async declarateParcel(@Body() body: CreateDeclarationDto, @UploadedFile() file: Express.Multer.File,) {

      return await this.userService.createDeclaration({...body, invoice_Pdf : file.buffer})


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


  // @Post('pay-parcels')
  // async payParcels(@GetUser() user: any, @Body() body: any) {

  // }
}
