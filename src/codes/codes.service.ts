import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Judge0 } from '../entities/judge0';
require('dotenv/config');

@Injectable()
export class CodesService {
  async create(createCodeDto: CreateCodeDto) {
    const judge0 = new Judge0();
    return await judge0.runCode({
      sourceCode: createCodeDto.source_code,
      languageID: createCodeDto.language_id,
      stdin: createCodeDto.stdin,
    });
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
