import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { KnowledgeGraphDto } from './graph-dto';

export class SolveTestQuestionDto {
  @ApiProperty({
    type: KnowledgeGraphDto,
    description: 'Previously extracted course pattern',
    required: true,
  })
  @Type(() => KnowledgeGraphDto)
  coursePattern: KnowledgeGraphDto;

  @ApiProperty({
    type: String,
    description: 'Example content used for learning',
    required: true,
  })
  @IsString()
  exampleContent: string;

  @ApiProperty({
    type: String,
    description: 'Test question to solve',
    required: true,
  })
  @IsString()
  testQuestion: string;
}
