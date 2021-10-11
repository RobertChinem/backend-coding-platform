import { Problem, ProblemDocument } from './entities/problem.entity';
import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createProblemDto: CreateProblemDto,
    token: string,
    provider: string,
  ) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }
    const problem = new this.problemModel(createProblemDto);
    return problem.save();
  }

  findAll() {
    return this.problemModel.find();
  }

  findOne(id: string) {
    return this.problemModel.findById(id);
  }

  async update(
    id: string,
    updateProblemDto: UpdateProblemDto,
    token: string,
    provider: string,
  ) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }
    return this.problemModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateProblemDto,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string, token: string, provider: string) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }
    return this.problemModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
