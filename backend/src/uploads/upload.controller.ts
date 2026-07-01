import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";

import { diskStorage } from "multer";

import { extname } from "path";

@Controller("upload")
export class UploadController {

  @Post()
  @UseInterceptors(
    FileInterceptor("file",{
      storage:diskStorage({

        destination:"uploads",

        filename(req,file,callback){

          const unique=
            Date.now()+
            "-" +
            Math.round(Math.random()*100000);

          callback(
            null,
            unique+
            extname(file.originalname),
          );

        },

      }),
    }),
  )

  upload(
    @UploadedFile()
    file:Express.Multer.File,
  ){

    return{

      url:
      `http://localhost:3000/uploads/${file.filename}`,

    };

  }

}