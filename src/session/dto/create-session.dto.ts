import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty({ message: 'Session ID should not be empty' })
  sessionId: string;
  @IsNotEmpty({ message: 'User ID should not be empty' })
  userId: string;
  @IsNotEmpty({ message: 'Token should not be empty' })
  token: string;
  @IsNotEmpty({ message: 'IsEnabled should not be empty' })
  isEnabled: boolean;
  @IsNotEmpty({ message: 'LifeTime should not be empty' })
  lifetime: number;
  @IsNotEmpty({ message: 'TimeOut should not be empty' })
  timeOut: Date;
}
