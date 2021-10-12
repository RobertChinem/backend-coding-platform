import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost, BlogPostDocument } from './entities/blog-post.entity';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createBlogPostDto: CreateBlogPostDto,
    token: string,
    provider: string,
  ) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }

    const blogPost = new this.blogPostModel(createBlogPostDto);
    return blogPost.save();
  }

  findAll() {
    return this.blogPostModel.find();
  }

  findOne(id: string) {
    return this.blogPostModel.findById(id);
  }

  async update(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
    token: string,
    provider: string,
  ) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }

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

  async remove(id: string, token: string, provider: string) {
    const user = await this.usersService.findUserByToken({ token, provider });
    if (!user) {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }
    return this.blogPostModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
