import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export enum ReactionType {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY"
}

export class UpdateLikeDto {
        
  @ApiProperty({ example: 't4jb4r3rn43jr4-432r343r34rr43' })
  @IsString({ message: 'El Post debe ser un string' })
  @IsNotEmpty({ message: 'El Post no debe ir vacio' })
  likeId: string;

  @ApiProperty({ example: 't4jb4r3rn43jr4-432r343r34rr43' })
  @IsOptional()
  @IsString()
  postId?: string;

  @ApiProperty({ example: 'LIKE' })
  @IsEnum(ReactionType, { message: 'La reaccion debe ser uno de los valores permitidos: LIKE, LOVE, HAHA, WOW, SAD, ANGRY' })
  @IsNotEmpty()
  reaction?: ReactionType;
}