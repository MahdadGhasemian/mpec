import { Injectable } from '@nestjs/common';
import { ExtractCoursePatternDto } from './dto/extract-course-pattern-dto';
import { ApplyPatternToExampleDto } from './dto/apply-pattern-to-example-dto';
import { SolveTestQuestionDto } from './dto/solve-test-question-dto';

@Injectable()
export class MpecsService {
  extractPattern(_extractCoursePatternDto: ExtractCoursePatternDto) {
    return {
      success: true,
      coursePattern: 'Course Pattern',
    };
  }

  applyPatternToExample(_applyPatternToExampleDto: ApplyPatternToExampleDto) {
    return {
      success: true,
      explanatoryChain: '',
    };
  }

  solveTestQuestion(_solveTestQuestionDto: SolveTestQuestionDto) {
    return {
      success: true,
      solution: {
        answer: '',
        explanatoryChain: '',
      },
    };
  }
}
