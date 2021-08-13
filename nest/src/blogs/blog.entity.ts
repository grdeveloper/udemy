import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, IsNull } from "typeorm";

import { User } from "../user/user.entity";

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  blog: string;

  @Column()
  imageUrl: string;

  @ManyToOne((type) => User, (user) => user.blogs, { eager: false })
  user: User;

  @Column()
  userId: string;
}
