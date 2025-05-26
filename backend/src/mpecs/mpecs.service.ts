import { Injectable } from '@nestjs/common';
import { CreateMpecDto } from './dto/create-mpec.dto';
import { UpdateMpecDto } from './dto/update-mpec.dto';

@Injectable()
export class MpecsService {
  create(createMpecDto: CreateMpecDto) {
    return 'This action adds a new mpec';
  }

  findAll() {
    return `This action returns all mpecs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mpec`;
  }

  update(id: number, updateMpecDto: UpdateMpecDto) {
    return `This action updates a #${id} mpec`;
  }

  remove(id: number) {
    return `This action removes a #${id} mpec`;
  }
}
