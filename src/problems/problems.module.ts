import { Problem, ProblemSchema } from './entities/problem.entity';
import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Problem.name, schema: ProblemSchema }]),
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
