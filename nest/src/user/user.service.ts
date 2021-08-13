import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { UserCredentialsDto } from "./dto/user-credentials.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<{token: string}> {
    const user = await this.userRepository.signUp(userCredentialsDto);
    return this.generateToken(user);
  }

  async signIn(userCredentialsDto: UserCredentialsDto): Promise<{token: string}> {
    const user = await this.userRepository.signIn(userCredentialsDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{token: string}> {
    const { id, username } = user;
    const token = this.jwtService.sign({ id, username });

    return {token};
  }
}
