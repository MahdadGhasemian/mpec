import { Injectable } from '@nestjs/common';
import { ExtractCoursePatternDto } from './dto/extract-course-pattern-dto';
import { ApplyPatternToExampleDto } from './dto/apply-pattern-to-example-dto';
import { SolveTestQuestionDto } from './dto/solve-test-question-dto';
import { CoursePatternExtractionService } from './course-pattern-extraction.service';

@Injectable()
export class MpecsService {
  constructor(
    private readonly coursePatternService: CoursePatternExtractionService,
  ) {}

  extractPattern(_extractCoursePatternDto: ExtractCoursePatternDto) {
    return this.coursePatternService.getAdditionPattern();
  }

  applyPatternToExample(_applyPatternToExampleDto: ApplyPatternToExampleDto) {
    return this.coursePatternService.getExampleAddition3Plus2();
  }

  solveTestQuestion(_solveTestQuestionDto: SolveTestQuestionDto) {
    return this.coursePatternService.getTestQuestionAddition3Plus2();
  }
}
