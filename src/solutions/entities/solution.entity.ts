import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolutionDocument = Solution & Document;

class TestCase {
  input: string;
  veredict: string;
  expectedOutput: string;
  compile_output: string | null;
  stdout: string | null;
  stderr: string | null;
}

class JudgeResult {
  veredict: string;
  testCases: TestCase[];
}

@Schema()
export class Solution {
  @Prop()
  sourceCode: string;

  @Prop()
  languageID: number;

  @Prop()
  problemID: string;

  @Prop()
  judgeResult: JudgeResult;
}

const SolutionSchema = SchemaFactory.createForClass(Solution);

export { SolutionSchema };
