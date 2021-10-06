import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost, BlogPostDocument } from './entities/blog-post.entity';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  create(createBlogPostDto: CreateBlogPostDto) {
    const blogPost = new this.blogPostModel(createBlogPostDto);
    return blogPost.save();
  }

  findAll() {
    return this.blogPostModel.find();
  }

  findOne(id: string) {
    return this.blogPostModel.findById(id);
  }

  update(id: string, updateBlogPostDto: UpdateBlogPostDto) {
    return this.blogPostModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateBlogPostDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.blogPostModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
