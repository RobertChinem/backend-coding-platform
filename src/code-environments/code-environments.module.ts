import {
  CodeEnvironment,
  CodeEnvironmentSchema,
} from './entities/code-environment.entity';
import { Module } from '@nestjs/common';
import { CodeEnvironmentsService } from './code-environments.service';
import { CodeEnvironmentsController } from './code-environments.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CodeEnvironment.name, schema: CodeEnvironmentSchema },
    ]),
  ],
  controllers: [CodeEnvironmentsController],
  providers: [CodeEnvironmentsService],
})
export class CodeEnvironmentsModule {}
