import { Solution, SolutionDocument } from './entities/solution.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Problem, ProblemDocument } from 'src/problems/entities/problem.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import axios from 'axios';

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
    const results = await Promise.all(
      testCases.map(({ input, expectedOutput }) =>
        axios
          .post(
            `${process.env.HOST_JUDGE0}/submissions/?base64_encoded=true&wait=true`,
            {
              source_code: createSolutionDto.source_code,
              language_id: createSolutionDto.language_id,
              stdin: Buffer.from(input, 'utf8').toString('base64'),
            },
          )
          .then(
            (r) =>
              Buffer.from(r.data.stdout, 'base64').toString('utf8') ===
              expectedOutput,
          ),
      ),
    );

    return results.every((f) => f);
  }

  findAll() {
    return `This action returns all solutions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solution`;
  }

  update(id: number, updateSolutionDto: UpdateSolutionDto) {
    return `This action updates a #${id} solution`;
  }

  remove(id: number) {
    return `This action removes a #${id} solution`;
  }
}
