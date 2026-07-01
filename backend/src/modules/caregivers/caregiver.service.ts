import { Injectable } from "@nestjs/common";

import { CaregiverRepository } from "./repository/caregiver.repository";

@Injectable()
export class CaregiverService {

  constructor(
    private repository: CaregiverRepository,
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