import { Injectable } from "@nestjs/common";
import { imageHash } from "image-hash";

@Injectable()
export class ImageSearchService {

  getHash(path: string): Promise<string> {
    return new Promise((resolve, reject) => {

      imageHash(path, 16, true, (error, data) => {

        if (error) {
          reject(error);
          return;
        }

        resolve(data);

      });

    });
  }

  distance(a: string, b: string): number {

    let diff = 0;

    const length = Math.min(a.length, b.length);

    for (let i = 0; i < length; i++) {

      if (a[i] !== b[i]) {
        diff++;
      }

    }

    return diff + Math.abs(a.length - b.length);
  }

}