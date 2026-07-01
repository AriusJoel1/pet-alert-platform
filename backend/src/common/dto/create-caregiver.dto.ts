import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';
import { CaregiverRole } from '../enums/caregiver-role.enum';

export class CreateCaregiverDto {

  @IsNotEmpty()
  fullName: string;

  @IsEnum(CaregiverRole)
  role: CaregiverRole;

  @IsNotEmpty()
  acceptedSpecies: string;

  @IsBoolean()
  acceptsMedication: boolean;
}