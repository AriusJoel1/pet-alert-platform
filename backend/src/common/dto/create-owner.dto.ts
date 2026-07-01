import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOwnerDto {

  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;
}