import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import axios from 'axios';
require('dotenv/config');

@Injectable()
export class CodesService {
  async create(createCodeDto: CreateCodeDto) {
    const response = await axios.post(
      `${process.env.HOST_JUDGE0}/submissions/?base64_encoded=true&wait=true`,
      createCodeDto,
    );
    return response.data;
  }

  findAll() {
    return `This action returns all codes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} code`;
  }

  update(id: number, updateCodeDto: UpdateCodeDto) {
    return `This action updates a #${id} code`;
  }

  remove(id: number) {
    return `This action removes a #${id} code`;
  }
}
