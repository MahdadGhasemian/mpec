import { Injectable } from '@nestjs/common';
import * as MOCKED_RESPONSE from '../libs/mock/mock_api_responses.json';

import { ExtractCoursePatternResponseDto } from './dto/extract-course-pattern-response-dto';
import { ApplyPatternToExampleResponseDto } from './dto/apply-pattern-to-example-response-dto';
import { SolveTestQuestionResponseDto } from './dto/solve-test-question-response-dto';

@Injectable()
export class CoursePatternExtractionService {
  getAdditionPattern(): ExtractCoursePatternResponseDto {
    return MOCKED_RESPONSE.coursePatternExtraction
      .addition as ExtractCoursePatternResponseDto;
  }

  getMultiplicationPattern(): ExtractCoursePatternResponseDto {
    return MOCKED_RESPONSE.coursePatternExtraction
      .multiplication as ExtractCoursePatternResponseDto;
  }

  getExampleAddition3Plus2(): ApplyPatternToExampleResponseDto {
    return MOCKED_RESPONSE.exampleAnalysis
      .addition_3_plus_2 as ApplyPatternToExampleResponseDto;
  }

  getExampleMultiplication4Times3(): ApplyPatternToExampleResponseDto {
    return MOCKED_RESPONSE.exampleAnalysis
      .multiplication_4_times_3 as ApplyPatternToExampleResponseDto;
  }

  getTestQuestionAddition3Plus2(): SolveTestQuestionResponseDto {
    return MOCKED_RESPONSE.testQuestionSolutions
      .addition_5_plus_4 as SolveTestQuestionResponseDto;
  }

  getTestQuestionMultiplication4Times3(): SolveTestQuestionResponseDto {
    return MOCKED_RESPONSE.testQuestionSolutions
      .multiplication_3_times_4 as SolveTestQuestionResponseDto;
  }
}
