import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { KnowledgeGraphDto } from './graph-dto';

export class ApplyPatternToExampleDto {
  @ApiProperty({
    type: KnowledgeGraphDto,
    description: 'Previously extracted course pattern',
    required: true,
  })
  @Type(() => KnowledgeGraphDto)
  coursePattern: KnowledgeGraphDto;

  @ApiProperty({
    type: String,
    description: 'LaTeX example content with question and answer',
    required: true,
  })
  @IsString()
  exampleContent: string;
}
