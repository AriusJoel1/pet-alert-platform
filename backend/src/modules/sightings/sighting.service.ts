import { Injectable } from "@nestjs/common";

import { SightingRepository } from "./repository/sighting.repository";

@Injectable()
export class SightingService {
  constructor(
    private repository: SightingRepository,
  ) {}

  create(dto: any) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  update(id: number, dto: any) {
    return this.repository.update(id, dto);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}