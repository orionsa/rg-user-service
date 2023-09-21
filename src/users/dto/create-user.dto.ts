import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be between 8 to 20 characters.' })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
