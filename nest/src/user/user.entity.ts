import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";

import { Blog } from "../blogs/blog.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Blog, (blog) => blog.user, { eager: true })
  blogs: Array<Blog>;

  async generateHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async validateHashedPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
