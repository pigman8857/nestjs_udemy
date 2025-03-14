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
      // signIn : () => Promise.resolve({} as User)
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

});
