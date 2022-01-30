import { CreateCommentDto } from './dto/create-comment.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CodeEnvironmentsService } from './code-environments.service';
import { UpdateCodeEnvironmentDto } from './dto/update-code-environment.dto';
import { CreateCommitDto } from './dto/create-commit.dto';

@Controller('code-environments')
export class CodeEnvironmentsController {
  constructor(
    private readonly codeEnvironmentsService: CodeEnvironmentsService,
  ) {}

  @Post()
  create() {
    return this.codeEnvironmentsService.create();
  }

  @Post(':id/states')
  commitState(
    @Param('id') id: string,
    @Body() createCommitDto: CreateCommitDto,
  ) {
    return this.codeEnvironmentsService.commitState(id, createCommitDto);
  }

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.codeEnvironmentsService.addComment(id, createCommentDto);
  }

  @Get()
  findAll() {
    return this.codeEnvironmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeEnvironmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCodeEnvironmentDto: UpdateCodeEnvironmentDto,
  ) {
    return this.codeEnvironmentsService.update(id, updateCodeEnvironmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeEnvironmentsService.remove(+id);
  }
}
