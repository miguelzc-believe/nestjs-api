import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    birthDate: Date;
}
