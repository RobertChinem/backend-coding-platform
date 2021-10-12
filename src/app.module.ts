import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemsModule } from './problems/problems.module';
import { CodesModule } from './codes/codes.module';
import { ChatGateway } from './chat.gateway';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubmissionsModule } from './submissions/submissions.module';
require('dotenv/config');

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@cluster0.khkex.mongodb.net/test`,
    ),
    ProblemsModule,
    CodesModule,
    BlogPostsModule,
    UsersModule,
    AuthModule,
    SubmissionsModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
