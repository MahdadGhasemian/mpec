import { Test, TestingModule } from '@nestjs/testing';
import { MpecsService } from './mpecs.service';

describe('MpecsService', () => {
  let service: MpecsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpecsService],
    }).compile();

    service = module.get<MpecsService>(MpecsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
