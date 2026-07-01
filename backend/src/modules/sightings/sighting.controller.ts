import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { SightingService } from "./sighting.service";

@Controller("sightings")
export class SightingController {
  constructor(
    private service: SightingService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: any,
  ) {
    return this.service.update(Number(id), dto);
  }

  @Delete(":id")
  delete(
    @Param("id") id: string,
  ) {
    return this.service.delete(Number(id));
  }
}

