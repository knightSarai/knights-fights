import { Test } from '@nestjs/testing';
import { SuperuserService } from './superuser.service';

describe('SuperuserService', () => {
  let service: SuperuserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SuperuserService],
    }).compile();

    service = module.get(SuperuserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
