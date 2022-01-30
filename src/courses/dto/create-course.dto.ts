class Section {
  type: 'markdown' | 'code';
}

class Chapter {
  title: string;
  content: Section[];
}

export class CreateCourseDto {
  title: string;
  chapters: Chapter[];
}
