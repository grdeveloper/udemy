import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Blog } from "../blogs/blog.entity";
import { User } from "../user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "blogdb",
  entities: [User, Blog],
  synchronize: true,
};
