import { Model } from 'mongoose';
import {
  CodeEnvironment,
  CodeEnvironmentDocument,
} from './entities/code-environment.entity';
import { Injectable } from '@nestjs/common';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UpdateCodeEnvironmentDto } from './dto/update-code-environment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CodeEnvironmentsService {
  constructor(
    @InjectModel(CodeEnvironment.name)
    private codeEnvironmentModel: Model<CodeEnvironmentDocument>,
  ) {}

  async commitState(id: string, createCommitDto: CreateCommitDto) {
    const codeEnvironment = await this.codeEnvironmentModel.findById(id);
    codeEnvironment.states.push({
      ...createCommitDto,
      timestamp: new Date().getTime(),
      id: uuidV4(),
    });
    return await codeEnvironment.save();
  }

  async addComment(id: string, createCommentDto: CreateCommentDto) {
    const codeEnvironment = await this.codeEnvironmentModel.findById(id);
    codeEnvironment.comments.push({
      ...createCommentDto,
    });
    return await codeEnvironment.save();
  }

  async create() {
    const codeEnvironment = new this.codeEnvironmentModel({
      name: 'default name',
      states: [],
      comments: [],
    });
    return await codeEnvironment.save();
  }

  async findOne(id: string) {
    const codeEnvironment = await this.codeEnvironmentModel.findById(id);
    return codeEnvironment;
  }

  findAll() {
    return `This action returns all codeEnvironments`;
  }

  update(id: number, updateCodeEnvironmentDto: UpdateCodeEnvironmentDto) {
    return `This action updates a #${id} codeEnvironment`;
  }

  remove(id: number) {
    return `This action removes a #${id} codeEnvironment`;
  }
}
