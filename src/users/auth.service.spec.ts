import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService Unit Test',() => {
    let authService: AuthService;
    let fakeUserService: Partial<UsersService>;
    beforeEach(async() => {

        const users: User[] = [];
        //Create a fake copy of the users service
        fakeUserService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email == email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = {id: Math.floor(Math.random() * 999999),email,password} as User;
                users.push(user);            
                return Promise.resolve(user) ;
            }
                                          
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
        await authService.signUp('asdf@asdf.com', 'asdf');
        
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
        await authService.signUp('laskdjf@alskdfj.com', 'password');

        await expect(
            authService.signIn('laskdjf@alskdfj.com', 'passowrd'),
        ).rejects.toThrow(new BadRequestException('bad password'));
      });

    it('Returns a user if correct password is provided', async () => {  
        await authService.signUp('laskdjf@alskdfj.com', 'mypassword');

        const user = await authService.signIn('laskdjf@alskdfj.com', 'mypassword');
   
        expect(user).toBeDefined();
    }) 
    
});

