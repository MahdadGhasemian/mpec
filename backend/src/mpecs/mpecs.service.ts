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

  async extractPattern(_extractCoursePatternDto: ExtractCoursePatternDto) {
    // Note: Just for testing ui loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.coursePatternService.getAdditionPattern();
  }

  async applyPatternToExample(_applyPatternToExampleDto: ApplyPatternToExampleDto) {
    // Note: Just for testing ui loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.coursePatternService.getExampleAddition3Plus2();
  }

  async solveTestQuestion(_solveTestQuestionDto: SolveTestQuestionDto) {
    // Note: Just for testing ui loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.coursePatternService.getTestQuestionAddition3Plus2();
  }
}
