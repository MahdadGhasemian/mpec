import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ExtractCoursePatternDto {
  @ApiProperty({
    type: String,
    description: 'LaTeX mathematical course content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  courseContent: string;
}
