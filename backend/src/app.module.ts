import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { CaregiversModule } from "./modules/caregivers/caregivers.module";
import { UploadController } from "./uploads/upload.controller";
import { Owner } from './database/entities/owner.entity';
import { Pet } from './database/entities/pet.entity';
import { Sighting } from './database/entities/sighting.entity';
import { Caregiver } from './database/entities/caregiver.entity';
import { Review } from './database/entities/review.entity';
import { Notification } from './database/entities/notification.entity';
import { SightingsModule } from "./modules/sightings/sightings.module";

import { PetsModule } from './modules/pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'pet-alert.db',
      synchronize: true,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([
      Owner,
      Pet,
      Sighting,
      Caregiver,
      Review,
      Notification,
    ]),

    PetsModule,
    NotificationsModule,
    CaregiversModule,
    SightingsModule,
  ],
  controllers:[
   UploadController,
  ],
})
export class AppModule {}