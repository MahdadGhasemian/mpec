import { Module } from '@nestjs/common';
import { MpecsService } from './mpecs.service';
import { MpecsController } from './mpecs.controller';
import { CoursePatternExtractionService } from './course-pattern-extraction.service';

@Module({
  controllers: [MpecsController],
  providers: [MpecsService, CoursePatternExtractionService],
})
export class MpecsModule {}
