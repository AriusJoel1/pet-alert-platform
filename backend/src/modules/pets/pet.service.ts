import { Injectable } from "@nestjs/common";
import { SearchContext } from "../../patterns/strategy/search-context";
import { NameStrategy } from "../../patterns/strategy/name.strategy";
import { SpeciesStrategy } from "../../patterns/strategy/species.strategy";
import { BreedStrategy } from "../../patterns/strategy/breed.strategy";
import { Express } from "express";
import { join } from "path";
import { existsSync } from "fs";
import { PetRepository } from "./repository/pet.repository";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { PetFactoryProvider } from "../../patterns/factory/pet-factory.provider";
import { NotificationSubject } from "../../patterns/observer/notification-subject";
import { NotificationService } from "../notifications/notification.service";
import { ImageSearchService } from "../image-search/image-search.service";

@Injectable()
export class PetService {

  private subject = new NotificationSubject();

  constructor(
    private readonly repository: PetRepository,
    private readonly notificationService: NotificationService,
    private readonly imageSearchService: ImageSearchService,
  ) {
    //  suscripción al observer
    this.subject.subscribe(this.notificationService);
  }

  //  CREATE con notificación
  async create(dto: CreatePetDto) {

    const factory =
      PetFactoryProvider.create(dto.species);

    const pet =
      factory.create(dto);

    const result =
      await this.repository.create(pet);

    await this.subject.notify(
      `Nueva mascota perdida: ${result.name}`
    );

    return result;
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

  // SEARCH (AGREGADO)
  async search(type: string, value: string) {
    const pets = await this.repository.findAll();

    let context;

    switch (type) {
      case "species":
        context = new SearchContext(new SpeciesStrategy());
        break;

      case "breed":
        context = new SearchContext(new BreedStrategy());
        break;

      default:
        context = new SearchContext(new NameStrategy());
        break;
    }

    return context.execute(pets, value);
  }

  async searchImage(file: Express.Multer.File) {

  const pets = await this.repository.findAll();

  if (!pets.length) {
    return null;
  }

  // Nombre del archivo subido
  const uploadedName = file.originalname
    .toLowerCase()
    .replace(/\.[^/.]+$/, "");

  // Primero intenta coincidencia por nombre
  const match = pets.find((pet: any) => {

    const imageName =
      pet.photo
        ?.split("/")
        .pop()
        ?.toLowerCase()
        ?.replace(/\.[^/.]+$/, "") ?? "";

    return imageName.includes(uploadedName);

  });

  if (match) {
    return match;
  }

  // Si no encuentra nada devuelve la primera mascota
  // (temporal mientras implementamos comparación por hash)
  return pets[0];

  } 
}