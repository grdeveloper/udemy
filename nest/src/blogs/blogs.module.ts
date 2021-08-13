import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BlogsService } from "./blogs.service";
import { BlogsController } from "./blogs.controller";
import { BlogRepository } from "./blog.repository";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository]), UserModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
