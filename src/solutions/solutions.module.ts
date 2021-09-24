import { Solution, SolutionSchema } from './entities/solution.entity';
import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Problem, ProblemSchema } from 'src/problems/entities/problem.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Problem.name, schema: ProblemSchema }]),
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
    ]),
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService],
})
export class SolutionsModule {}
