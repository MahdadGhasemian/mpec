import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SolveTestQuestionDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  coursePattern: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  exampleContent: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  testQuestion: string;
}
