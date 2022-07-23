import { Test, TestingModule } from '@nestjs/testing';
import { FightsService } from './fights.service';

describe('FightsService', () => {
  let service: FightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FightsService],
    }).compile();

    service = module.get<FightsService>(FightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
