import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService Unit Test',() => {
    let service: AuthService;

    beforeEach(async() => {
        //Create a fake copy of the users service
        const fakeUserService: Partial<UsersService> = {
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

        service = module.get(AuthService);

    })

    it('Can create an instance of auth service', async() => {

        expect(service).toBeDefined();
    });

    it('create a new user with a salted and hased password', async() => {

        const user = await service.signUp('asdf@asdf.com','asdf');
        expect(user.password).not.toEqual('asdf');
        const [salt,hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
});
