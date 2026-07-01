import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from "../notifications/notifications.module";
import { Pet } from '../../database/entities/pet.entity';
import { ImageSearchService } from "../image-search/image-search.service";
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
    ImageSearchService,
  ],

  exports: [
    PetService,
    PetRepository,
    ImageSearchService,
  ],
})
export class PetsModule {}