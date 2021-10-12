import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

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
export class Submission {
  @Prop()
  sourceCode: string;

  @Prop()
  languageID: number;

  @Prop()
  problemID: string;

  @Prop()
  judgeResult: JudgeResult;

  @Prop()
  userID: string;
}

const SubmissionSchema = SchemaFactory.createForClass(Submission);

export { SubmissionSchema };
