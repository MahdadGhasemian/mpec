import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApplyPatternToExampleDto {
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
}
