import { Problem, ProblemDocument } from './entities/problem.entity';
import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
  ) {}

  create(createProblemDto: CreateProblemDto) {
    const problem = new this.problemModel(createProblemDto);
    return problem.save();
  }

  findAll() {
    return this.problemModel.find();
  }

  findOne(id: string) {
    return this.problemModel.findById(id);
  }

  update(id: string, updateProblemDto: UpdateProblemDto) {
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

  remove(id: string) {
    return this.problemModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
