import { Controller, Post, Body } from '@nestjs/common';
import { MpecsService } from './mpecs.service';
import { ExtractCoursePatternDto } from './dto/extract-course-pattern-dto';
import { ApplyPatternToExampleDto } from './dto/apply-pattern-to-example-dto';
import { SolveTestQuestionDto } from './dto/solve-test-question-dto';
import { Serialize } from '../libs';
import { ExtractCoursePatternResponseDto } from './dto/extract-course-pattern-response-dto';
import { ApplyPatternToExampleResponseDto } from './dto/apply-pattern-to-example-response-dto';
import { SolveTestQuestionResponseDto } from './dto/solve-test-question-response-dto';

@Controller('api')
export class MpecsController {
  constructor(private readonly mpecsService: MpecsService) {}

  @Post('extract-course-pattern')
  @Serialize(ExtractCoursePatternResponseDto)
  extract(@Body() extractCoursePatternDto: ExtractCoursePatternDto) {
    return this.mpecsService.extractPattern(extractCoursePatternDto);
  }

  @Post('apply-pattern-to-example')
  @Serialize(ApplyPatternToExampleResponseDto)
  applyPattern(@Body() applyPatternToExampleDto: ApplyPatternToExampleDto) {
    return this.mpecsService.applyPatternToExample(applyPatternToExampleDto);
  }

  @Post('solve-test-question')
  @Serialize(SolveTestQuestionResponseDto)
  solve(@Body() solveTestQuestionDto: SolveTestQuestionDto) {
    return this.mpecsService.solveTestQuestion(solveTestQuestionDto);
  }
}
