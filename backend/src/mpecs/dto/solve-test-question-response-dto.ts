import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { ExplanatoryChainDto } from './graph-dto';

export class SolutionDto {
  @ApiProperty({
    type: String,
    description: 'Final answer to the test question',
    required: true,
  })
  @IsString()
  answer: string;

  @ApiProperty({
    type: ExplanatoryChainDto,
    description: 'Explanatory chain showing how the answer was derived',
    required: true,
  })
  @Type(() => ExplanatoryChainDto)
  @Expose()
  explanatoryChain: ExplanatoryChainDto;
}

export class SolveTestQuestionResponseDto {
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
    type: SolutionDto,
    description: 'Complete solution with answer and explanation',
    required: true,
  })
  @IsObject()
  @Type(() => SolutionDto)
  @Expose()
  solution: SolutionDto;

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
