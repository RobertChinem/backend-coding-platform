import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission, SubmissionDocument } from './entities/submission.entity';
import { Judge0 } from './../entities/judge0';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Problem, ProblemDocument } from 'src/problems/entities/problem.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Problem.name)
    private problemModel: Model<ProblemDocument>,
    @InjectModel(Submission.name)
    private submissionModel: Model<SubmissionDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
    token: string,
    provider: string,
  ) {
    const problem = await this.problemModel
      .findById(createSubmissionDto.problem_id)
      .exec();
    const { testCases } = problem;
    const judge0 = new Judge0();
    const judgeResult = await judge0.judge(
      {
        sourceCode: createSubmissionDto.source_code,
        languageID: createSubmissionDto.language_id,
      },
      testCases || [],
    );

    const user = await this.usersService.findUserByToken({ token, provider });
    const solution = {
      sourceCode: createSubmissionDto.source_code,
      languageID: createSubmissionDto.language_id,
      problemID: createSubmissionDto.problem_id,
      judgeResult: judgeResult,
    };

    if (user && user._id) {
      return new this.submissionModel({
        ...solution,
        userID: user._id,
      }).save();
    }
    return solution;
  }

  async findAll(token: string, provider: string) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (user && user._id) {
      return this.submissionModel.find({ userID: user._id });
    }
    return this.submissionModel.find();
  }

  findOne(id: string) {
    return this.submissionModel.findById(id);
  }

  remove(id: string) {
    return this.submissionModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
