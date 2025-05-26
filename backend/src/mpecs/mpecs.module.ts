import { Module } from '@nestjs/common';
import { MpecsService } from './mpecs.service';
import { MpecsController } from './mpecs.controller';

@Module({
  controllers: [MpecsController],
  providers: [MpecsService],
})
export class MpecsModule {}
