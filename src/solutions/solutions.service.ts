import { Judge0 } from './../entities/judge0';
import { Solution, SolutionDocument } from './entities/solution.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Problem, ProblemDocument } from 'src/problems/entities/problem.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
    @InjectModel(Solution.name) private solutionModel: Model<SolutionDocument>,
  ) {}

  async create(createSolutionDto: CreateSolutionDto) {
    const problem = await this.problemModel
      .findById(createSolutionDto.problem_id)
      .exec();
    const { testCases } = problem;
    const judge0 = new Judge0();
    const judgeResult = await judge0.judge(
      {
        sourceCode: createSolutionDto.source_code,
        languageID: createSolutionDto.language_id,
      },
      testCases || [],
    );

    const solution = new this.solutionModel({
      sourceCode: createSolutionDto.source_code,
      languageID: createSolutionDto.language_id,
      problemID: createSolutionDto.problem_id,
      judgeResult: judgeResult,
    });
    return solution.save();
  }

  findAll() {
    return this.solutionModel.find();
  }

  findOne(id: string) {
    return this.solutionModel.findById(id);
  }

  remove(id: string) {
    return this.solutionModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
