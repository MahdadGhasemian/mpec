import { Test, TestingModule } from '@nestjs/testing';
import { MpecsController } from './mpecs.controller';
import { MpecsService } from './mpecs.service';

describe('MpecsController', () => {
  let controller: MpecsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MpecsController],
      providers: [MpecsService],
    }).compile();

    controller = module.get<MpecsController>(MpecsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
