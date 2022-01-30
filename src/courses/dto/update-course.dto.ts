import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

class Section {
  type: 'markdown' | 'code';
}

class Chapter {
  title: string;
  content: Section[];
}

export class UpdateCourseDto {
  title: string;
  chapters: Chapter[];
}
