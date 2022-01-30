import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDocument, Course } from './entities/course.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = new this.courseModel({
      title: createCourseDto.title,
      chapters: createCourseDto.chapters,
    });
    return await course.save();
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseModel.findById(id);
    course.title = updateCourseDto.title;
    course.chapters = updateCourseDto.chapters;
    return await course.save();
  }

  async remove(id: string) {
    return await this.courseModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
