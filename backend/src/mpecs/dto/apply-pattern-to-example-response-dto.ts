import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class ApplyPatternToExampleResponseDto {
  @ApiProperty({
    type: Boolean,
    example: false,
    required: true,
  })
  @IsBoolean()
  @Expose()
  success: boolean;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Expose()
  explanatoryChain: string;
}
