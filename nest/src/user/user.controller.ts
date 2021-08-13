import { Body, Controller, Post } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserCredentialsDto } from "./dto/user-credentials.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<{token: string}> {
    return this.userService.signUp(userCredentialsDto);
  }

  @Post("/signin")
  signIn(@Body() userCredentialsDto: UserCredentialsDto): Promise<{token: string}> {
    return this.userService.signIn(userCredentialsDto);
  }
}
