import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ExplanatoryChainDto } from './graph-dto';

export class ApplyPatternToExampleResponseDto {
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
    type: ExplanatoryChainDto,
    description: 'Generated explanatory chain',
    required: true,
  })
  @Type(() => ExplanatoryChainDto)
  @Expose()
  explanatoryChain: ExplanatoryChainDto;

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
