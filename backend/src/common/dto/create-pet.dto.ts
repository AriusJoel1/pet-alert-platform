import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePetDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  species: string;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  photo: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}