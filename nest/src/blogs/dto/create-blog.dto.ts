import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  blog: string;

  @IsOptional()
  imageUrl: string;
}
