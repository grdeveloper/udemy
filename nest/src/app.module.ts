import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from 'path';

import { BlogsModule } from "./blogs/blogs.module";
import { typeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, "..", "uploads"),
          serveRoot: "/uploads",
          serveStaticOptions: {
              index: false,
          }
      }),
      TypeOrmModule.forRoot(typeOrmConfig),
      BlogsModule,
      UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
