import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProblemDocument = Problem & Document;

@Schema()
export class Problem {
  @Prop()
  description: string;

  @Prop()
  testCases: any[];

  @Prop()
  title: string;
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
