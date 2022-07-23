import { Test, TestingModule } from '@nestjs/testing';
import { FightsController } from './fights.controller';

describe('FightsController', () => {
  let controller: FightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FightsController],
    }).compile();

    controller = module.get<FightsController>(FightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
