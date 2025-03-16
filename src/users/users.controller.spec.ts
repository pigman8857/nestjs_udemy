import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  let mockedUsersService: Partial<UsersService>;

  let mockedAuthService: Partial<AuthService>;

  beforeEach(async () => {

    mockedUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@asdf.com', password: 'asdf'} as User)
      },
      find: (email : string) => {
        return Promise.resolve([{ id : 1, email, password: 'asdf'}] as User[])
      },
      // remove: (id: number) => {
      //   return Promise.resolve({} as User)
      // },
      // update: (id: number, attrs: Partial<User>) => {
      //   return Promise.resolve({} as User)
      // }
    };

    mockedAuthService = {
      // signUp : () => Promise.resolve({} as User),
      signIn : (email: string, password: string) => Promise.resolve({id: 1, email, password} as User)
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockedUsersService
        },
        {
          provide: AuthService,
          useValue: mockedAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUser returns a list of users with the given email',async() => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0]).toEqual({ id:1, email: 'asdf@asdf.com', password: 'asdf'} as User);
  })

  it('findUser throws an error if user with given id is not found', async () => {
    mockedUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('findUser returns a single user with the given id', async () => {
    expect(controller.findUser('1')).resolves.toEqual({ id:1, email: 'asdf@asdf.com', password: 'asdf'} as User)
  });

  it('signIn updates session object and returns user', async() => {
    const session = {userID : -1};
    const result = await controller.signIn(
      {email: 'asdf@asdf.com',password: 'asdf'}, 
      session);

      expect(result.id).toEqual(1);
      expect(session.userID).toEqual(1);
  });

});
