import { Test, TestingModule } from '@nestjs/testing';
import { FastfoodsService } from './fastfoods.service';

describe('FastfoodsService', () => {
  let service: FastfoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FastfoodsService],
    }).compile();

    service = module.get<FastfoodsService>(FastfoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
