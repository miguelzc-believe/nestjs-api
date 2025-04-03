import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";


export class UserResponse extends CreateUserDto {
    @ApiProperty()
    id: string;
    @ApiProperty({type:Date})
    createdAt: Date;
    @ApiProperty({type:Date})
    updatedAt: Date;
}
