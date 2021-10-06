import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

@Schema()
export class BlogPost {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  cover: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
