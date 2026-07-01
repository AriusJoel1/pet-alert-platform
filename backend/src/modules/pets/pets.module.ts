import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from "../notifications/notifications.module";
import { Pet } from '../../database/entities/pet.entity';

import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PetRepository } from './repository/pet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    NotificationsModule,
  ],

  controllers: [
    PetController,
  ],

  providers: [
    PetService,
    PetRepository,
  ],

  exports: [
    PetService,
    PetRepository,
  ],
})
export class PetsModule {}