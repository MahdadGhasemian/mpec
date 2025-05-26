import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsObject, IsString } from 'class-validator';

export class SolutionDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  answer: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  explanatoryChain: string;
}

export class SolveTestQuestionResponseDto {
  @ApiProperty({
    type: Boolean,
    example: false,
    required: true,
  })
  @IsBoolean()
  @Expose()
  success: boolean;

  @ApiProperty({
    type: SolutionDto,
    required: true,
  })
  @IsObject()
  @Type(() => SolutionDto)
  @Expose()
  solution: SolutionDto;
}
