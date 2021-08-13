import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { User } from "./user.entity";
import { UserCredentialsDto } from "./dto/user-credentials.dto";

const DUPLICATE_KEY_CODE = "23505";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ username, password }: UserCredentialsDto): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = await user.generateHashedPassword(password);

    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn({ username, password }: UserCredentialsDto): Promise<User> {
    const user = await this.findOne({ username });

    if (user && (await user.validateHashedPassword(password))) {
      return user;
    }

    return null;
  }
}
