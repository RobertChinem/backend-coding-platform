import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
require('dotenv/config');

interface IUser {
  name: string;
  email: string;
  avatar: string;
}

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  async create(
    @Body() createBlogPostDto: CreateBlogPostDto,
    @Headers('token') token,
    @Headers('auth_provider') provider,
  ) {
    return await this.blogPostsService.create(
      createBlogPostDto,
      token,
      provider,
    );
  }

  @Get()
  findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @Headers('token') token,
    @Headers('auth_provider') provider,
  ) {
    return await this.blogPostsService.update(
      id,
      updateBlogPostDto,
      token,
      provider,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('token') token,
    @Headers('auth_provider') provider,
  ) {
    return await this.blogPostsService.remove(id, token, provider);
  }
}
