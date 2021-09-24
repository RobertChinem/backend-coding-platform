import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolutionDocument = Solution & Document;

@Schema()
export class Solution {
  @Prop()
  language_id: number;

  @Prop()
  source_code: string;

  @Prop()
  problem_id: string;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
