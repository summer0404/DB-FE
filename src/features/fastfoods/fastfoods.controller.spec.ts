import { Test, TestingModule } from '@nestjs/testing';
import { FastfoodsController } from './fastfoods.controller';
import { FastfoodsService } from './fastfoods.service';

describe('FastfoodsController', () => {
  let controller: FastfoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastfoodsController],
      providers: [FastfoodsService],
    }).compile();

    controller = module.get<FastfoodsController>(FastfoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
