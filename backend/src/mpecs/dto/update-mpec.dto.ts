import { PartialType } from '@nestjs/mapped-types';
import { CreateMpecDto } from './create-mpec.dto';

export class UpdateMpecDto extends PartialType(CreateMpecDto) {}
