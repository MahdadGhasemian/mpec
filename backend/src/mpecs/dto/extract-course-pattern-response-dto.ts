import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class ExtractCoursePatternResponseDto {
  @ApiProperty({
    type: Boolean,
    example: false,
    required: true,
  })
  @IsBoolean()
  @Expose()
  success: boolean;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @Expose()
  coursePattern: string;
}
