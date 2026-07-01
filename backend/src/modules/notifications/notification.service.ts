import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Notification } from "../../database/entities/notification.entity";
import { NotificationObserver } from "../../patterns/observer/notification-observer.interface";

@Injectable()
export class NotificationService implements NotificationObserver {

  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>
  ) {}

  //  OBSERVER: recibe notificaciones
  async update(message: string) {
    await this.repository.save({
      message,
      receiver: "Todos",
    });
  }

  //  LISTAR NOTIFICACIONES 
  findAll() {
    return this.repository.find({
      order: {
        id: "DESC",
      },
    });
  }
}