// import { Test, TestingModule } from '@nestjs/testing';
// import { Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';

// import { Parcel } from 'libs/entities/parcel.entity';
// import { Declaration } from 'libs/entities/declaration.entity';
// import { Transaction } from 'libs/entities/transactions.entity';
// import { NotFoundException } from '@nestjs/common';
// import { UserService } from '../user.service';
// import { User } from 'libs/entities/user.entity';
// import { TransactionType } from 'libs/enums/transactions.enum';

// // Mocked Data
// const mockUser = {
//     id: '123',
//     password: '1231231',
//     email: "akaki@gmail.com",
//     accessLevel: 0,
//     balance: 1000,
//     transactions: [{ id: '12351', amount: 100, TransactionType: "Deposit", date: "2024-11-13T14:15:31.781Z" }],
//     parcels: [{ id: 'parcel1', payment_status: 'unpaid', tracking_id: "121312", weight: 4.1, price: 22.75, shipping_status: "brought", declaration: null }],
//     userDetails: {
//         id: "41d17473-cd58-4df7-ac83-30fdf03c5114",
//         first_name: "John",
//         last_name: "Doe",
//         phone_number: "1234679325",
//         personal_number: "112211111111",
//         office: "saburtalo",
//         city: "tbilisi ",
//         address: "tbilisi2"
//     },
// };

// describe('UserService', () => {
//     let service: UserService;
//     let userRepository: Repository<User>;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 UserService,
//                 {
//                     provide: getRepositoryToken(User),
//                     useClass: Repository,
//                 },
//                 {
//                     provide: getRepositoryToken(Transaction),
//                     useClass: Repository,
//                 },
//                 {
//                     provide: getRepositoryToken(Parcel),
//                     useClass: Repository,
//                 },
//                 {
//                     provide: getRepositoryToken(Declaration),
//                     useClass: Repository,
//                 },
//             ],
//         }).compile();

//         service = module.get<UserService>(UserService);
//         userRepository = module.get<Repository<User>>(getRepositoryToken(User));
//     });

//     // Test case 1: Should get profile successfully
//     it('should return user profile with balance', async () => {
//         jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);

//         const result = await service.getProfile('123');

//         expect(result).toEqual({
//             ...mockUser,
//             balance: mockUser.balance,
//         });
//         expect(userRepository.findOne).toHaveBeenCalledWith({
//             where: { id: '123' },
//             relations: ['transactions', 'parcels', 'parcels.declaration', 'userDetails'],
//         });
//     });

//     // Test case 2: Should throw NotFoundException when user is not found
//     it('should throw NotFoundException if user is not found', async () => {
//         jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

//         await expect(service.getProfile('nonexistentId')).rejects.toThrow(NotFoundException);
//         expect(userRepository.findOne).toHaveBeenCalledWith({
//             where: { id: 'nonexistentId' },
//             relations: ['transactions', 'parcels', 'parcels.declaration', 'userDetails'],
//         });
//     });

//     // Test case 3: Should handle errors properly
//     it('should throw NotFoundException with error message if repository fails', async () => {
//         const errorMessage = 'Repository error';
//         jest.spyOn(userRepository, 'findOne').mockRejectedValue(new Error(errorMessage));

//         await expect(service.getProfile('123')).rejects.toThrow(NotFoundException);
//         try {
//             await service.getProfile('123');
//         } catch (error) {
//             expect(error.message).toBe(errorMessage);
//         }
//     });
// });
