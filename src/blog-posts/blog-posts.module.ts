import { Module } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsController } from './blog-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './entities/blog-post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
    ]),
  ],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
})
export class BlogPostsModule {}
