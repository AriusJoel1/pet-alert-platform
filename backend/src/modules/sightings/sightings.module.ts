import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Sighting } from "../../database/entities/sighting.entity";

import { SightingController } from "./sighting.controller";
import { SightingService } from "./sighting.service";
import { SightingRepository } from "./repository/sighting.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sighting,
    ]),
  ],

  controllers: [
    SightingController,
  ],

  providers: [
    SightingService,
    SightingRepository,
  ],

  exports: [
    SightingService,
  ],
})
export class SightingsModule {}