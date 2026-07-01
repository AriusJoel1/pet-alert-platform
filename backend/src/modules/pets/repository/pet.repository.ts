import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Pet } from "../../../database/entities/pet.entity";

@Injectable()
export class PetRepository {
  constructor(
    @InjectRepository(Pet)
    private readonly repository: Repository<Pet>,
  ) {}

  create(data: Partial<Pet>) {
    const pet = this.repository.create(data);
    return this.repository.save(pet);
  }

  findAll(search?: string) {
    if (search) {
      return this.repository
        .createQueryBuilder("pet")
        .where("LOWER(pet.name) LIKE LOWER(:search)", {
          search: `%${search}%`,
        })
        .orderBy("pet.id", "DESC")
        .getMany();
    }

    return this.repository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const pet = await this.repository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException(
        "Mascota no encontrada",
      );
    }

    return pet;
  }

  async update(
    id: number,
    data: Partial<Pet>,
  ) {
    const pet = await this.findOne(id);

    Object.assign(pet, data);

    return this.repository.save(pet);
  }

  async delete(id: number) {
    const pet = await this.findOne(id);

    await this.repository.remove(pet);

    return {
      message: "Mascota eliminada correctamente",
    };
  }
}