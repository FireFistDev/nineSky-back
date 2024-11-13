import { BadGatewayException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../libs/dtos/UserDto.ts/create-user.dto';
import { UpdateUserDto } from '../../libs/dtos/UserDto.ts/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../libs/entities/user.entity';
import { Repository } from 'typeorm';
import { Parcel } from 'libs/entities/parcel.entity';
import { Declaration } from 'libs/entities/declaration.entity';
import { CreateDeclarationDto } from 'libs/dtos/declarationDtos.ts/createDeclarationDto';
import { Transaction } from 'libs/entities/transactions.entity';
import { TransactionType } from 'libs/enums/transactions.enum';
import { PaymentType } from 'libs/enums/payment.status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Transaction)
    private TransactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
    @InjectRepository(Declaration)
    private declarationRepository: Repository<Declaration>,
  ) {}

  async getProfile(id : string ){

    try {
      const user = await this.userRepository.findOne({
        where: {id},
        
        relations: ['transactions','parcels', 'parcels.declaration', 'userDetails' , ],
      });
      if (!user) {
        throw new NotFoundException('მომხმარებელი ამ ID-ით ვერ მოიძებნა.');
      }
      return {
        ...user,
        balance : user.balance,
      };
      
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    }

    async updateProfile(id: string, data: UpdateUserDto) {
      const { email , password,personal_number ,office , first_name , last_name , phone_number, city , address} = data;
      console.log(data)
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['userDetails'], // Ensures userDetails are loaded
  
      });
      const createdUser =  this.userRepository.create({email,password,userDetails : {first_name, office,personal_number,last_name,phone_number,city,address}})
      await this.userRepository.save(createdUser);
      return user;
    }

    
    async createDeclaration(createDeclarationDto: CreateDeclarationDto) {
      try {
        const { type, price, website, comment, invoice_Pdf, tracking_id } = createDeclarationDto;
        console.log(createDeclarationDto)
        const parcel = await this.parcelRepository.findOne({ where: { tracking_id } });
        const declaration = this.declarationRepository.create({
          type,
          price,
          website,
          comment: comment || null,
          invoice_Pdf: invoice_Pdf || null,
        });
        const savedDeclaration = await this.declarationRepository.save(declaration);
        parcel.declaration = savedDeclaration;
        await this.parcelRepository.save(parcel);
        return savedDeclaration;
      } catch(error) {
  
    }
    }

    async depositeBalance(userId : string, data : {amount : number}){
     try {
      const user = await this.userRepository.findOne({where:{ id : userId}})
      const newTransaction =  this.TransactionRepository.create({
        user,
        date: new Date,
        amount:data.amount,
        transactionType : TransactionType.DEPOSIT

      })

      return this.TransactionRepository.save(newTransaction)
     } catch (error) {
      
     }
    }

    async payParcels(userId : string ,parcels : { tracking_id : string}[]){

      const user = await this.userRepository.findOne({ where: { id: userId } });

      const pricesList = await Promise.all(parcels.map(async parcel => {
        const mainParcel = await this.parcelRepository.findOne({ where: { id: parcel.tracking_id } });
        if (mainParcel.payment_status === PaymentType.PAID) return 0;  // If paid, no charge
        return mainParcel.price;
      }));
      const totalPrice = pricesList.reduce((acc, price) => acc + price, 0); 
      if (user.balance <= totalPrice) {
        console.log('User has sufficient balance');
      }
      const createTransaction = this.TransactionRepository.create({ amount: totalPrice, date: new Date,transactionType : TransactionType.PAYMENT, user })
      await this.TransactionRepository.save(createTransaction)
    }

  // async findOne(criteria: { [key: string]: any }){

  //   try {

  //     const user = await this.userRepository.findOne({
  //       where: criteria,
  //       relations: ['transactions','parcels', 'parcels.declaration'],
  //     });
  //     if (!user) {
  //       throw new NotFoundException('მომხმარებელი ამ ID-ით ვერ მოიძებნა.');
  //     }
      
  //     return { ...user, balance: user.balance, }
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message)

  //     }
  //     throw new InternalServerErrorException('Internal server error.');

  //   }
  
 

}
