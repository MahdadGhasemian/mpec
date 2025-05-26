import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExtractCoursePatternDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  courseContent: string;
}
