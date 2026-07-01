import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Sighting } from "../../../database/entities/sighting.entity";

@Injectable()
export class SightingRepository {
  constructor(
    @InjectRepository(Sighting)
    private repository: Repository<Sighting>,
  ) {}

  create(data: Partial<Sighting>) {
    const sighting = this.repository.create(data);
    return this.repository.save(sighting);
  }

  findAll() {
    return this.repository.find({
      relations: {
        pet: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        pet: true,
      },
    });
  }

  async update(id: number, data: Partial<Sighting>) {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}