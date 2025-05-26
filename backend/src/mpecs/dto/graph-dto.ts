import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

export enum RelationType {
  AXIOM = 'axiom',
  DEFINITION = 'definition',
  STEP = 'step',
  OPERATION = 'operation',
  CONCLUSION = 'conclusion',
  PROBLEM = 'problem',
}

export enum RelationshipNameType {
  GROUNDS = 'grounds',
  ENABLES = 'enables',
  REQUIRES = 'requires',
  PRODUCES = 'produces',
  DECOMPOSES_TO = 'decomposes_to',
  APPLIES = 'applies',
  EVALUATES_TO = 'evaluates_to',
}

export class EntityDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the entity',
    required: true,
  })
  @IsString()
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Full name or description of the entity',
    required: true,
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Short label for display purposes',
    required: true,
  })
  @IsString()
  @Expose()
  label: string;

  @ApiProperty({
    enum: RelationType,
    description: 'Type of mathematical entity',
    required: true,
  })
  @IsEnum(RelationType)
  @Expose()
  type?: RelationType;

  @ApiProperty({
    type: Boolean,
    description: 'Whether this entity is a starting point in the graph',
    example: false,
    required: true,
  })
  @IsBoolean()
  @Expose()
  start: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Whether this entity is an ending point in the graph',
    example: false,
    required: true,
  })
  @IsBoolean()
  @Expose()
  end: boolean;
}

export class RelationDto {
  @ApiProperty({
    type: String,
    description: 'ID of the source entity',
    required: true,
  })
  @IsString()
  @Expose()
  source: string;

  @ApiProperty({
    type: String,
    description: 'ID of the target entity',
    required: true,
  })
  @IsString()
  @Expose()
  target: string;

  @ApiProperty({
    enum: RelationshipNameType,
    description: 'Type of relationship',
    required: true,
  })
  @IsEnum(RelationshipNameType)
  @Expose()
  type: RelationshipNameType;

  @ApiProperty({
    type: String,
    description: 'Human-readable description of the relationship',
    required: true,
  })
  @IsString()
  @Expose()
  name: string;
}

export class ExplanatoryStepDto {
  @ApiProperty({
    type: Number,
    description: 'Step number in the sequence',
    required: true,
  })
  @IsNumber()
  @Expose()
  stepNumber: number;

  @ApiProperty({
    type: String,
    description: 'Description of what happens in this step',
    required: true,
  })
  @IsString()
  @Expose()
  description: string;

  @ApiProperty({
    type: String,
    description: 'The mathematical calculation performed',
    required: true,
  })
  @IsString()
  @Expose()
  calculation: string;

  @ApiProperty({
    type: String,
    description: 'Reasoning behind this step',
    required: true,
  })
  @IsString()
  @Expose()
  reasoning: string;
}

export class KnowledgeGraphDto {
  @ApiProperty({
    type: EntityDto,
    description: 'List of entities in the graph',
    required: true,
    isArray: true,
  })
  @Type(() => EntityDto)
  @IsArray()
  @Expose()
  entities: EntityDto[];

  @ApiProperty({
    type: RelationDto,
    description: 'List of relations between entities',
    required: true,
    isArray: true,
  })
  @Type(() => RelationDto)
  @IsArray()
  @Expose()
  relations: RelationDto[];
}

export class ExplanatoryChainDto extends KnowledgeGraphDto {
  @ApiProperty({
    type: ExplanatoryStepDto,
    description: 'Ordered list of explanatory steps',
    required: true,
    isArray: true,
  })
  @Type(() => ExplanatoryStepDto)
  @IsArray()
  @Expose()
  steps: ExplanatoryStepDto[];
}
