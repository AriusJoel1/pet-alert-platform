import { Injectable } from "@nestjs/common";

import { PetRepository } from "./repository/pet.repository";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";

import { NotificationSubject } from "../../patterns/observer/notification-subject";
import { NotificationService } from "../notifications/notification.service";

@Injectable()
export class PetService {

  private subject = new NotificationSubject();

  constructor(
    private readonly repository: PetRepository,
    private readonly notificationService: NotificationService,
  ) {
    //  suscripción al observer
    this.subject.subscribe(this.notificationService);
  }

  //  CREATE con notificación
  async create(dto: CreatePetDto) {
    const pet = await this.repository.create(dto);

    await this.subject.notify(
      `Nueva mascota perdida: ${pet.name}`
    );

    return pet;
  }

  // LISTAR
  findAll(search?: string) {
    return this.repository.findAll(search);
  }

  // OBTENER UNO
  findOne(id: number) {
    return this.repository.findOne(id);
  }

  // ACTUALIZAR
  update(id: number, dto: UpdatePetDto) {
    return this.repository.update(id, dto);
  }

  // ELIMINAR
  delete(id: number) {
    return this.repository.delete(id);
  }
}