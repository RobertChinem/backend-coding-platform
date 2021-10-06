import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { OAuth2Client } from 'google-auth-library';
require('dotenv/config');

interface IUser {
  name: string;
  email: string;
  avatar: string;
}

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  async verify(idToken: string): Promise<IUser> {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    return {
      name: name || '',
      email: email || '',
      avatar: picture || '',
    };
  }

  @Post()
  async create(
    @Body() createBlogPostDto: CreateBlogPostDto,
    @Headers() headers,
  ) {
    try {
      await this.verify(headers.token || '');
      return this.blogPostsService.create(createBlogPostDto);
    } catch {
      throw new UnauthorizedException();
    }
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
  update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogPostsService.update(id, updateBlogPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostsService.remove(id);
  }
}
