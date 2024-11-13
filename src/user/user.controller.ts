import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../../libs/dtos/UserDto.ts/create-user.dto';
import { UpdateUserDto } from '../../libs/dtos/UserDto.ts/update-user.dto';
import { JwtGuard } from 'libs/guards/Jwt.Auth.Guard';
import { GetUser } from 'libs/decorators/getUser';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateDeclarationDto } from 'libs/dtos/declarationDtos.ts/createDeclarationDto';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

//  profili tavis tranzaqciebit da amanatebbit 
  @Get('profile') 
  async getProfile(@GetUser() user : userPaylaod ) {
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

    @Post('deposite')
  async updateBalance(@GetUser() user: userPaylaod, @Body() body: {amount: number}) {
     return this.userService.depositeBalance(user.sub, body)
  }

  @Post('pay-parcels')
  async payParcels(@GetUser() user: userPaylaod, @Body() body: {tracking_id:string}[]) {
    return this.userService.payParcels(user.sub, body)
  }
  
  



}
