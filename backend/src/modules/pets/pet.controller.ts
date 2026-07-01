import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { PetService } from "./pet.service";
import { UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";

@Controller("pets")
export class PetController {
  constructor(
    private readonly petService: PetService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreatePetDto,
  ) {
    return this.petService.create(dto);
  }

  @Post("search-image")
  @UseInterceptors(FileInterceptor("file"))
  searchImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.petService.searchImage(file);
  }


  @Get()
  findAll(
    @Query("search")
    search?: string,
  ) {
    return this.petService.findAll(search);
  }

  @Get("search")
  search(
    @Query("type")
    type: string,

    @Query("value")
    value: string,
  ) {
    return this.petService.search(
      type,
      value,
    );
  }

  @Get(":id")
  findOne(
    @Param("id")
    id: string,
  ) {
    return this.petService.findOne(
      Number(id),
    );
  }

  @Patch(":id")
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdatePetDto,
  ) {
    return this.petService.update(
      Number(id),
      dto,
    );
  }

  @Delete(":id")
  delete(
    @Param("id")
    id: string,
  ) {
    return this.petService.delete(
      Number(id),
    );
  }
}