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
            create: (email: string, password: string) =>  Promise.resolve({id:1 , email, password} as User)
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

});
