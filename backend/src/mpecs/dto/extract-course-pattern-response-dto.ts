import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { KnowledgeGraphDto } from './graph-dto';

export class ExtractCoursePatternResponseDto {
  @ApiProperty({
    type: Boolean,
    description: 'Whether the application was successful',
    example: false,
    required: true,
  })
  @IsBoolean()
  @Expose()
  success: boolean;

  @ApiProperty({
    type: KnowledgeGraphDto,
    description: 'Extracted course pattern as knowledge graph',
    required: true,
  })
  @Type(() => KnowledgeGraphDto)
  @Expose()
  coursePattern: KnowledgeGraphDto;

  @ApiProperty({
    type: String,
    description: 'Optional error message if success is false',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Expose()
  error?: string;
}
