import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExtractCoursePatternDto {
  @ApiProperty({
    type: String,
    description: 'LaTeX mathematical course content',
    required: true,
  })
  @IsString()
  courseContent: string;
}
