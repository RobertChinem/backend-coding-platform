import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

class Section {
  type: 'markdown' | 'code';
}

class Chapter {
  title: string;
  content: Section[];
}

@Schema()
export class Course {
  @Prop()
  title: string;

  @Prop()
  chapters: Chapter[];
}

const CourseSchema = SchemaFactory.createForClass(Course);

export { CourseSchema };
