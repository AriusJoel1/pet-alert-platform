import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CaregiverService } from "./caregiver.service";

@Controller("caregivers")
export class CaregiverController {

  constructor(
    private service: CaregiverService,
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