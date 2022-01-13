import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CodeEnvironmentDocument = CodeEnvironment & Document;

class Comment {
  username: string;
  text: string;
  commit_id: string;
}

class Code {
  source_code: string;
  language_id: number;
  stdin: string;
}

class CodeEnvironmentState {
  id: string;
  timestamp: number;
  code: Code;
  parent_commit: string;
  message: string;
  username: string;
}

@Schema()
export class CodeEnvironment {
  @Prop()
  name: string;

  @Prop()
  states: CodeEnvironmentState[];

  @Prop()
  comments: Comment[];
}

const CodeEnvironmentSchema = SchemaFactory.createForClass(CodeEnvironment);

export { CodeEnvironmentSchema };
