import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService Unit Test',() => {
    let authService: AuthService;
    let fakeUserService: Partial<UsersService>;
    beforeEach(async() => {
        //Create a fake copy of the users service
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>  
                Promise.resolve({id:1 , email, password} as User                    
            )
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile();

        authService = module.get(AuthService);

    })

    it('Can create an instance of auth service', async() => {

        expect(authService).toBeDefined();
    });

    it('create a new user with a salted and hased password', async() => {

        const user = await authService.signUp('asdf@asdf.com','asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt,hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is in use', async () => {
        fakeUserService.find = () =>  
          Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        
        await expect(authService.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
          BadRequestException,
        );
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(
            authService.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(new NotFoundException('User not found'));
    });

    it('throws if an invalid password is provided', async () => {
        fakeUserService.find = () =>
          Promise.resolve([
            { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
          ]);
        await expect(
            authService.signIn('laskdjf@alskdfj.com', 'passowrd'),
        ).rejects.toThrow(new BadRequestException('bad password'));
      });

    it('Returns a user if correct password is provided', async () => {
        fakeUserService.find = () =>
            Promise.resolve([
              { email: 'asdf@asdf.com', password: 'f825e70521782095.136514914e8e3e2df7b4c19bf6308d868c9903e77b6b4ccb3f7a081746277653' } as User,
            ]);    
        const user = await authService.signIn('laskdjf@alskdfj.com', 'mypassword');
   
        expect(user).toBeDefined();
    }) 
    
});

