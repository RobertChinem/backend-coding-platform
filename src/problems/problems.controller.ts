import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post()
  async create(
    @Body() createProblemDto: CreateProblemDto,
    @Headers('token') token,
    @Headers('auth_provider') provider,
  ) {
    return this.problemsService.create(createProblemDto, token, provider);
  }

  @Get()
  findAll() {
    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemDto,
    @Headers('token') token,
    @Headers('auth_provider') provider,
  ) {
    return await this.problemsService.update(
      id,
      updateProblemDto,
      token,
      provider,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('token') token,
    @Headers('auth_provider') provider,
  ) {
    return await this.problemsService.remove(id, token, provider);
  }
}
