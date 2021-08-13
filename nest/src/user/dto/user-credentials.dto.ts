import { IsNotEmpty, IsString } from "class-validator";

export class UserCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
