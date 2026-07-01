import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Caregiver } from "../../database/entities/caregiver.entity";

import { CaregiverController } from "./caregiver.controller";
import { CaregiverService } from "./caregiver.service";
import { CaregiverRepository } from "./repository/caregiver.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Caregiver,
    ]),
  ],

  controllers: [
    CaregiverController,
  ],

  providers: [
    CaregiverService,
    CaregiverRepository,
  ],

  exports: [
    CaregiverService,
  ],
})
export class CaregiversModule {}