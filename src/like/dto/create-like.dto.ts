import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsUUID } from "class-validator";

export enum ReactionType {
  LIKE = "LIKE",
  LOVE = "LOVE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY"
}

export class CreateLikeDto {
        
  @ApiProperty({ example: '543rr2324r-f432r32f32-f432r432r3' })
  @IsString({ message: 'El Post debe ser un string' })
  @IsNotEmpty({ message: 'El Post no debe ir vacio' })
  @IsUUID()
  postId: string;

  @ApiProperty({ example: 'LOVE' })
  @IsEnum(ReactionType, { message: 'La reaccion debe ser uno de los valores permitidos: LIKE, LOVE, HAHA, WOW, SAD, ANGRY' })
  @IsNotEmpty()
  reaction: ReactionType;
}