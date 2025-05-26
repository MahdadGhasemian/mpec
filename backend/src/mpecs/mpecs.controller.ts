import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MpecsService } from './mpecs.service';
import { CreateMpecDto } from './dto/create-mpec.dto';
import { UpdateMpecDto } from './dto/update-mpec.dto';

@Controller('mpecs')
export class MpecsController {
  constructor(private readonly mpecsService: MpecsService) {}

  @Post()
  create(@Body() createMpecDto: CreateMpecDto) {
    return this.mpecsService.create(createMpecDto);
  }

  @Get()
  findAll() {
    return this.mpecsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mpecsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMpecDto: UpdateMpecDto) {
    return this.mpecsService.update(+id, updateMpecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mpecsService.remove(+id);
  }
}
