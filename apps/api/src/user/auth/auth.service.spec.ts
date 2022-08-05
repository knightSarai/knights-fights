import { Test, TestingModule } from '@nestjs/testing';
import { AuthService  } from './auth.service';
import { UserService } from '../user.service';
import { User } from '../user.entity';
import { BadRequestException } from '@nestjs/common';


describe('AuthService', () => {
  let mockUserService: Partial<UserService>;
  let service: AuthService;

  beforeEach(async () => {
    mockUserService= {
      find: () => Promise.resolve(null),
      create: (username: string, email: string, password: string) => Promise.resolve({ id: 1, username, email, password } as User),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: UserService, useValue: mockUserService},
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with hashed password', async () => {
    const user = await service.signUp('testUser', 'testPassword', 'test@test2.com');
    expect(user).toBeDefined();
    expect(user.password).not.toEqual('testPassword');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('should throw an error if user already exists', async () => {
    mockUserService.find = () => Promise.resolve({ id: 1, username: 'testUser', email: 'test@test2.com'} as User);
    try {
      await service.signUp('testUser', 'testPassword', 'test@test2.com')
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toEqual('Email already exists');
    }
  })

  it('should throw an error if signin called with invalid credentials', async () => {
    try {
      await service.signIn('test@tes.com', 'testPassword');
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toEqual('Invalid credentials');
    }
  })
});
