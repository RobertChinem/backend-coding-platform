import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemsModule } from './problems/problems.module';
import { CodesModule } from './codes/codes.module';
require('dotenv/config');

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@cluster0.khkex.mongodb.net/test`,
    ),
    ProblemsModule,
    CodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
