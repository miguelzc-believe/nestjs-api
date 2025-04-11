import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum ReactionType {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY"
}

export class UpdateLikeDto {
        
  @IsString({ message: 'El Post debe ser un string' })
  @IsNotEmpty({ message: 'El Post no debe ir vacio' })
  likeId: string;

  @IsString({ message: 'El Post debe ser un string' })
  @IsNotEmpty({ message: 'El Post no debe ir vacio' })
  postId: string;

  @IsEnum(ReactionType, { message: 'La reaccion debe ser uno de los valores permitidos: LIKE, LOVE, HAHA, WOW, SAD, ANGRY' })
  @IsNotEmpty()
  reaction?: ReactionType;
}