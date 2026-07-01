import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Caregiver } from "../../../database/entities/caregiver.entity";

@Injectable()
export class CaregiverRepository {

  constructor(
    @InjectRepository(Caregiver)
    private repository: Repository<Caregiver>,
  ) {}

  create(data: Partial<Caregiver>) {
    const caregiver = this.repository.create(data);
    return this.repository.save(caregiver);
  }

  findAll() {
    return this.repository.find({
      order: {
        rating: "DESC",
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(id: number, data: Partial<Caregiver>) {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

}