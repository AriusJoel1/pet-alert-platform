import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}